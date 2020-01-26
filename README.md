# YoTest

YoTest tests the ability to deploy an Excel task-pane add-in based on code produced by the [Yo Office generator](https://github.com/OfficeDev/generator-office) for the Angular/TypeScript framework.

## Problems

The following problems were encountered and fixed in the code generated by Yo Office.

**Problem:** The add-in's icon did not appear during sideloading (from the Insert tab).  It appeared with the _Show Taskpane_ button for the add-in on Excel's _Home_ tab when testing with _npm run_, but not when running a production build with the manifest _yotest.xml_.

**Fix:** Add an entry to the _CopyWebpackPlugin_ in _webpack.config.js_ to include the _assets_ directory in the production build.

**Problem:** The Angular _*ngFor_ directive is recognized when testing with _npm run_, but not when running a production build.  The console log for the task pane displays the error messages

    Can't bind to 'ngforOf' since it isn't a known property of 'li'.

    Property binding ngforOf not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the "@NgModule.declarations".

**Fix:** (1) Include _CommonModule_ in _@NgModule.declarations_ in _app.module.ts_.  Import it in _app.component.ts_ (and in any other component that uses Angular directives).  (2) Import _BrowserModule_ in _taskpane.ts_.  (3) Replace _use: "html-loader"_ in _webpack.config.js_ by the following.

          use: [
            {
              loader: "html-loader",
              options: { minimize: false }
            }
          ]
  
  Explicit inclusion of other [Angular modules](https://angular.io/guide/frequent-ngmodules) are needed to support the use of Angular forms and routing.

## Customizations

In addition to fixes for the problems noted above, the following customizations are recommended when developing an add-in using the code generated by Yo Office.

### manifest.xml

Generate a new _&lt;Id&gt;_.  Change the provider and display names, description, AppDomain, amd GetStarted strings.

Make a copy of the manifest in which all occurrences of <https://localhost:3000> are replaced by the URL for a directory containing the production code generated in the folder _dist_ by _npm run build_.

For YoTest, the folder _dist_ was uploaded to _stageonesoftware.com_ and renamed to _YoTest_.  The manifest _yotest.xml_ uses the URL <https://stageonesoftware.com/YoTest> instead of <https://localhost:3000>.

### package.json

Change the name and repository URL.

### taskpane.html

Change the title and the sideload message.

### app.component.ts

Change the code in the _run_ method.  If the _run_ method generates content for the task pane, create a constructor that calls _run_ to generate that content before the task pane is displayed.

YoTest was customized by changing code that highlights and logs the selected range to set an instance variable instead, adding a constructor to ensure this variable is set before the task pane is displayed, and adding a sample list of strings for use with _*ngFor_.

### app.component.html

Replace the content.  

In YoTest, the new content used an Angular directive (_*ngFor_) and selector (_<app-test></app-test>), and it displayed the value _{{selectedRange}}_ of the new instance variable.

### assets

Replace _icon-16.png_, _icon-32.png_, and _icon-80.png_ by new icons.  Add _icon-64.png_ for use under Mac OS X.  Delete _logo_filled.png_.

## Copyright

Copyright (c) 2020 Stage One Software. All rights reserved.
