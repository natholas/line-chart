import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChartComponent } from './chart.component'
import { ChartInputService } from './chart-input.service'

export * from './chart.component'
export * from './chart-input.service'

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
export class NathanAngularChart {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NathanAngularChart,
      providers: [ChartInputService]
    };
  }
}
