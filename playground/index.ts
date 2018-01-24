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
  template: `
  <nathan-angular-chart
  class="line-chart"
  [data]="data"
  [labels]="labels"
  [decimalPlaces]="0"
></nathan-angular-chart>`,
  styles: [
    `.line-chart {
      width: 100%;
      display: block;
      position: absolute;
      right: 0;
    }`
  ]
})
class AppComponent {
  data = [1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5, 1, 3, 2, 4, 5,]
  labels = ['a', 'b', 'c', 'd', 'e']
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NathanAngularChart ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
