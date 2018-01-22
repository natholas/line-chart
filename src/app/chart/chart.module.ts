import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartInputService } from './chart-input.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChartComponent,
    LineChartComponent
  ],
  providers: [
    ChartInputService
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
