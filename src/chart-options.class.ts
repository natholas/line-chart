import { Component } from '@angular/core';

export class ChartOptions {
  colors: string[] = ['rgba(0,255,0,1)', 'rgba(0,255,0,0.5)', 'rgba(0,0,0,0.3)', 'black']
  fontSize: number = 12
  decimalPlaces: number = 1
  zoomSpeed: number = 100
  limits: number[] = [0, 0]
  offsets: number[] = [0.2, 0.2]
  size: number[] = [1000, 600]
  minLabelSpacing: number = 10

  constructor(
    colors: string[],
    decimalPlaces: number,
    fontSize: number,
    limits: number[],
    offsets: number[],
    size: number[],
    minLabelSpacing: number,
    zoomSpeed: number
  ) {
    if (colors !== undefined) this.colors = colors
    if (decimalPlaces !== undefined) this.decimalPlaces = decimalPlaces
    if (fontSize !== undefined) this.fontSize = fontSize
    if (limits !== undefined) this.limits = limits
    if (offsets !== undefined) this.offsets = offsets
    if (size !== undefined) this.size = size
    if (minLabelSpacing !== undefined) this.minLabelSpacing = minLabelSpacing
    if (zoomSpeed !== undefined) this.zoomSpeed = zoomSpeed
  }
}
