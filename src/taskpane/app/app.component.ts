import { Component } from "@angular/core";
const template = require("./app.component.html");
/* global console, Excel, require */

@Component({
  selector: "app-home",
  template
})
export default class AppComponent {
  welcomeMessage = "YoTest";
  selectedRange = '';
  sampleList = ['One', 'Two', 'Three'];

  constructor() {
    // Ensure that selectedRange has a value before displaying the task pane
    this.run();
  }

  async run() {
    try {
      await Excel.run(async context => {
        const range = context.workbook.getSelectedRange();
        range.load("address");
        await context.sync();
        this.selectedRange = range.address;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
