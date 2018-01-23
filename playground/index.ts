/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NathanAngularChart } from 'nathan-angular-chart';

@Component({
  selector: 'app',
  template: `<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <nathan-angular-chart
  [data]="data"
  [labels]="labels"
></nathan-angular-chart>`
})
class AppComponent {
  data = [1,3,2,4,5]
  labels = ['a', 'b', 'c', 'd', 'e']
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NathanAngularChart ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
