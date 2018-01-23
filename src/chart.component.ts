import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartInputService } from './chart-input.service';
import { ChartOptions } from './chart-options.class';

@Component({
  selector: 'nathan-angular-chart',
  template: '<canvas #lineChart class="chart"></canvas>'
})
export class ChartComponent implements OnInit {
  @ViewChild('lineChart') lineChart
  @Input() data: number[]
  @Input() labels: string[]
  @Input() colors: string[]
  @Input() decimalPlaces: number
  @Input() fontSize: number
  @Input() zoomSpeed: number
  @Input() limits: number[]
  @Input() offsets: number[]
  @Input() size: number[]
  @Input() minLabelSpacing: number
  private options: ChartOptions
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private rendering: boolean = false

  constructor(private chartInput: ChartInputService) { }
  
  ngOnInit() {
    this.options = new ChartOptions(
      this.colors,
      this.decimalPlaces,
      this.fontSize,
      this.limits,
      this.offsets,
      this.size,
      this.minLabelSpacing,
      this.zoomSpeed
    )
    let el = this.lineChart.nativeElement
    this.chartInput.setup(el, this.options.limits, this.options.zoomSpeed, this.update.bind(this))
    this.canvas = this.lineChart.nativeElement
    this.ctx = this.canvas.getContext('2d')
    this.rendering = true
    this.render()
  }

  ngOnChanges() {
    this.render()
  }

  public render() {
    if (!this.rendering) return
    let data = this.data.slice()
    this.resizeCanvas()
    this.clearCanvas()

    let xPos = this.options.limits[0]
    let stepSize = (((this.options.size[0] - this.options.limits[0]) - this.options.limits[1]) / (data.length - 1))
    let removeStart = Math.abs(Math.ceil(xPos / stepSize)) - 1
    let removeEnd = Math.abs(Math.floor(this.options.limits[1] / stepSize)) - 1

    if (removeStart > 0) {
      xPos += removeStart * stepSize
      data = data.splice(removeStart)
    }
    if (removeEnd > 0) data = data.splice(0, data.length - removeEnd)

    let guideData = data.slice()
    data = this.normalizeData(data, 0, this.options.size[1], this.getOffsets(data))
    data = this.reverseHeights(data)
    this.drawLine(data, xPos, stepSize)
    this.drawGuides(guideData, data)
    this.renderLabels(this.labels)
  }

  private renderLabels(_labels: string[]) {
    let labels = _labels.slice()
    let xPos = this.options.limits[0]
    let stepSize = (((this.options.size[0] - this.options.limits[0]) - this.options.limits[1]) / (labels.length - 1))

    let interval = this.getLabelAdjustmentInterval(labels, this.options.minLabelSpacing)
    if (interval > 0) {
      labels = this.adjustedLabels(labels, interval)
    }

    let removeStart = Math.abs(Math.ceil(xPos / stepSize)) - 1
    let removeEnd = Math.abs(Math.floor(this.options.limits[1] / stepSize)) - 1

    if (removeStart > 0) {
      xPos += removeStart * stepSize
      labels = labels.splice(removeStart)
    }
    if (removeEnd > 0) labels = labels.splice(0, labels.length - removeEnd)
    this.drawLabels(labels, xPos, stepSize)
  }

  private drawLabels(labels: string[], xPos: number, stepSize: number) {
    for (let label of labels) {
      let labelWidth = this.getStringSize(label, this.options.fontSize)
      let startPos = xPos - labelWidth / 2
      if (startPos > 0 && startPos + labelWidth < this.canvas.width) {
        this.ctx.fillText(label, startPos, this.canvas.height - this.options.fontSize / 1.5)
      }
      xPos += stepSize
    }
  }

  private drawLine(data: number[], xPos: number, stepSize: number) {
    this.ctx.beginPath()

    let up = data[0] > data[data.length - 1]
    this.ctx.strokeStyle = this.options.colors[0]
    this.ctx.fillStyle = this.options.colors[1]

    this.ctx.moveTo(xPos, data[0])
    for (let point of data) {
      this.ctx.lineTo(xPos, point)
      xPos += stepSize
    }
    this.ctx.lineWidth = 3
    this.ctx.stroke()

    this.ctx.lineTo(this.options.size[0], this.options.size[1])
    this.ctx.lineTo(0, this.options.size[1])
    this.ctx.fill()
  }

  private drawGuides(rawData: number[], pixelData: number[]) {
    let rawMin = Math.min(...rawData)
    let rawMax = Math.max(...rawData)
    let rawMid = rawData.reduce((a, b) => {
      return a + b
    }) / rawData.length

    let pixelMin = Math.max(...pixelData)
    let pixelMax = Math.min(...pixelData)
    let pixelMid = pixelData.reduce((a, b) => {
      return a + b
    }) / pixelData.length

    this.ctx.strokeStyle = this.options.colors[2]
    this.ctx.fillStyle = this.options.colors[3]
    this.ctx.lineWidth = 1
    this.ctx.font = this.options.fontSize + "px Arial"

    this.ctx.fillText(rawMin.toFixed(this.options.decimalPlaces), 4, pixelMin + this.options.fontSize / 3)
    this.ctx.beginPath()
    this.ctx.moveTo((rawMin.toFixed(this.options.decimalPlaces).length * this.options.fontSize / 1.5) + 4, pixelMin)
    this.ctx.lineTo(this.canvas.width, pixelMin)
    this.ctx.stroke()

    this.ctx.fillText(rawMax.toFixed(this.options.decimalPlaces), 4, pixelMax + this.options.fontSize / 3)
    this.ctx.beginPath()
    this.ctx.moveTo((rawMax.toFixed(this.options.decimalPlaces).length * this.options.fontSize / 1.5) + 4, pixelMax)
    this.ctx.lineTo(this.canvas.width, pixelMax)
    this.ctx.stroke()

    this.ctx.fillText(rawMid.toFixed(this.options.decimalPlaces), 4, pixelMid + this.options.fontSize / 3)
    this.ctx.beginPath()
    this.ctx.moveTo((rawMid.toFixed(this.options.decimalPlaces).length * this.options.fontSize / 1.5) + 4, pixelMid)
    this.ctx.lineTo(this.canvas.width, pixelMid)
    this.ctx.stroke()
  }

  private getLabelAdjustmentInterval(labels: string[], minSpacing: number) {
    let totalLabel = labels.reduce((total: string, label: string) => {
      return total + label
    })

    let totalLabelWidth = this.getStringSize(totalLabel, this.options.fontSize)
    totalLabelWidth += labels.length * minSpacing

    let totalWidth = this.canvas.width - this.options.limits[0] - this.options.limits[1]

    return Math.floor(totalLabelWidth / totalWidth)
  }

  private adjustedLabels(labels: string[], interval: number) {
    let count = 0
    for (let i = 0; i < labels.length; i++) {
      count += 1
      if (count <= interval) {
        labels[i] = ''
      } else count = 0
    }
    return labels
  }

  private resizeCanvas() {
    this.canvas.width = this.options.size[0]
    this.canvas.height = this.options.size[1]
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.options.size[0], this.options.size[1])
  }

  private getOffsets(data: number[]) {
    let range = Math.max(...data) - Math.min(...data)
    return [
      range * this.options.offsets[0],
      range * this.options.offsets[1]
    ]
  }

  private getStringSize(string: string, fontSize: number) {
    return string.length * fontSize / 2
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
      return this.options.size[1] - a
    })
  }


  update() {
    this.render()
  }
}
