# YoTest

YoTest fixes several problems in the production build of the code created by the [Yeoman Office Generator](https://github.com/OfficeDev/generator-office) for Excel add-ins using the Angular/TypeScript framework.  The folder `dist` in its production build is available on the web at https://stageonesoftware.com/YoTest.  The manifest `manifest.prod.xml` in that directory has been renamed to `yotest.xml`.  Sideload that manifest to try the add-in.

**Problem:** The add-in's icon does not appear during sideloading (from Excel's _Insert_ tab).  It appears with the _Show Taskpane_ button on Excel's _Home_ tab in a development build, but not in a production build.

**Fix:** Add a a pattern `{to: "assets", from: "./assets"}` to the `CopyWebpackPlugin` in `webpack.config.js` to include the `assets` directory in the production build.

**Problem:** The Angular `*ngFor` directive is recognized in a development build, but not in a production build.  The console log for the task pane displays the error messages

    Can't bind to 'ngforOf' since it isn't a known property of 'li'.

    Property binding ngforOf not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the "@NgModule.declarations".

**Fix:** (1) Include `CommonModule` in `@NgModule.imports` in `app.module.ts`.  (2) Import it in `app.component.ts` (and in any other components that use Angular directives).  (3) Expand `use: "html-loader"` in `webpack.config.js` to

          use: [
            {
              loader: "html-loader",
              options: { minimize: false }
            }
          ]
  
Explicit inclusion of other [Angular modules](https://angular.io/guide/frequent-ngmodules) may be needed to support the use of Angular forms and routing.

## Customizations

In addition to fixes for these problems, the following customizations are recommended when developing an add-in using code created by the Yeoman Office Generator.

### manifest.xml

Generate a new `Id` (using https://www.guidgenerator.com).

Supply appropriate values for `ProviderName`, `Description`, `SupportUrl`, and `AppDomain`.

Edit the definitions of string resources (and fix the misspelling of “successfully”).

### package.json

Change the name and repository URL.

## webpack.config.js

Remove the definitions `const fs` and `const webpack` for variables that are never used.  In their place, add

    /* global module, process, require */

to suppress problems detected by `eslint`.

Specify a production deployment location, for example with

     const urlProd="https://stageonesoftware.com/YoTest/";

### taskpane.css

Simplify if you are not using the styles created for the sample Contoso taskpane.  Consider specifying `Helvetica` as the `font-family`.  It's cleaner than `Arial` and `Times`, and it is available both under Windows and Mac OS X, whereas Microsoft's preferred `Segoe` font is available only under Windows.

### taskpane.html

Change the title and the sideload message.

### app.component.html

Replace the content.  In YoTest, this content uses an Angular directive (`*ngFor`), displays the value `{{selectedRange}}` of a new instance variable instead of highlighting the selected range when the _Run_ button is clicked, and provides a better message about that button (now called _Refresh_).  The old message made no sense: modifying the source code is not something users do.

### app.component.ts

The `run` method now records the address of the selected range in the `selectedRange` instance variable.  The `AppComponent` constructor ensures that this variable is set before the task pane is displayed.

### assets

Replace `icon-16.png`, `icon-32.png`, and `icon-80.png` by new icons.  Add `icon-64.png` for use under Mac OS X.  Delete `logo_filled.png`.

## Puzzles

Why doesn't `templateUrl` work inside `@Component` in `app.component.ts`?  Why must this file `require` a template instead?

Why is it necessary to click _Show Taskpane_ twice in the production build to load the taskpane in Excel for Windows?

Why does Internet Explorer no longer load the taskpane for [Formula Forge](https://appsource.microsoft.com/en-us/product/office/WA200001816?tab=Overview), an add-in published in the AppSource marketplace?  Is the problem caused by the versions of the packages listed in `package.json`?

TO DO: Run `npm outdated --long` to see what packages be updated.  Compare `package.json`, `manifest.xml`, and `webpack.config.js` in Formula Forge with those in YoTest.  

## Copyright

Copyright &copy; 2020 Stage One Software. All rights reserved.
