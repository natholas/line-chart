import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @ViewChild('lineChart') lineChart
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private rendering: boolean = false

  @Input() data: number[]
  @Input() colors: string[]
  @Input() zoomSpeed: number
  @Input() limits: number[]
  @Input() offsets: number[]
  @Input() size: number[]

  ngOnInit() {
    this.canvas = this.lineChart.nativeElement
    this.ctx = this.canvas.getContext('2d')
    this.rendering = true
    this.renderLine()
  }

  ngOnChanges() {
    this.renderLine()
  }

  public renderLine() {
    if (!this.rendering) return
    let data = this.data.slice()
    this.resizeCanvas()
    this.clearCanvas()

    let xPos = this.limits[0]
    let stepSize = (((this.size[0] - this.limits[0]) - this.limits[1]) / data.length)
    let removeStart = Math.abs(Math.ceil(xPos / stepSize)) - 1
    let removeEnd = Math.abs(Math.floor(this.limits[1] / stepSize)) - 1

    if (removeStart > 0) {
      xPos += removeStart * stepSize
      data = data.splice(removeStart)
    }
    if (removeEnd > 0) data = data.splice(0, data.length - removeEnd)

    data = this.normalizeData(data, 0, this.size[1], this.getOffsets(data))
    data = this.reverseHeights(data)
    this.drawLine(data, xPos, stepSize)
  }

  private drawLine(data: number[], xPos: number, stepSize: number) {
    this.ctx.beginPath();

    let up = data[0] > data[data.length - 1]
    this.ctx.strokeStyle = this.colors[0]
    this.ctx.fillStyle = this.colors[1]

    this.ctx.moveTo(xPos, data[0])
    for (let point of data) {
      xPos += stepSize
      this.ctx.lineTo(xPos, point)
    }
    this.ctx.lineWidth = 3
    this.ctx.stroke()

    this.ctx.lineTo(this.size[0], this.size[1])
    this.ctx.lineTo(0, this.size[1])
    this.ctx.fill()
  }

  private resizeCanvas() {
    this.canvas.width = this.size[0]
    this.canvas.height = this.size[1]
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.size[0], this.size[1])
  }

  private getOffsets(data: number[]) {
    let range = Math.max(...data) - Math.min(...data)
    return [
      range * this.offsets[0],
      range * this.offsets[1]
    ]
  }

  /**
   * normalizeData
   * Changes array values so that lowest value is min and highest is max
   * This ensures that the chart data spans the whole chart vertically
   */
  private normalizeData(data: number[], min: number, max: number, offsets) {
    let lowest = Math.min(...data)
    if (lowest > offsets[0]) lowest -= offsets[0]
    else lowest = 0
    let highest = Math.max(...data)
    highest += offsets[1]
    let multiplier = max / (highest - lowest)
    return data.map(a => {
      return Math.floor((a - lowest) * multiplier)
    })
  }

  /**
   * reverseHeights
   * Reverses the array so that it goes from bottom to top
   */
  private reverseHeights(input) {
    return input.map(a => {
      return this.size[1] - a
    })
  }

}
