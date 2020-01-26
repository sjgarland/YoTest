import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import AppComponent from "./app.component";
import { CommonModule } from "@angular/common";
import { TestComponent } from "./test.component";
@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [BrowserModule, CommonModule],
  bootstrap: [AppComponent]
})
export default class AppModule {}
