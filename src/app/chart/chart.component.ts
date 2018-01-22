import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartInputService } from './chart-input.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('lineChart') lineChart
  @Input() data: number[]
  @Input() labels: string[]
  @Input() colors: string[]

  public zoomSpeed: number = 100
  public size: number[] = [1000, 600]
  public limits: number[] = [0,0]
  public offsets: number[] = [0.2, 0.2]

  constructor(private chartInput: ChartInputService) { }
  
  ngOnInit() {
    let el = this.lineChart.lineChart.nativeElement
    this.chartInput.setup(el, this.limits, this.zoomSpeed, this.update.bind(this))
  }

  update() {
    this.lineChart.renderLine()
  }
}
