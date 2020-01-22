# YoTest

YoTest was created to test the ability to deploy an Excel task-pane add-in based on code produced by the [Yo Office generator](https://github.com/OfficeDev/generator-office) for the Angular/TypeScript framework.

## Development log

Customized manifest.xml: generated a new GUID, replace references to Contoso.

Customized app.component.ts.  Changed code that highlighted and logged the selected range to set an instance variable (selectedRange).  Ensured that this variable was set before the task pane was displayed.

Customized app.component.html.  Removed/modified Contoso messages.  Displayed the value of {{selectedRange}}.

## Copyright

Copyright (c) 2020 Stage One Software. All rights reserved.
