import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartInputService } from './chart-input.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChartComponent
  ],
  providers: [
    ChartInputService
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
