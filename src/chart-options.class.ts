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
    if (colors) this.colors = colors
    if (decimalPlaces) this.decimalPlaces = decimalPlaces
    if (fontSize) this.fontSize = fontSize
    if (limits) this.limits = limits
    if (offsets) this.offsets = offsets
    if (size) this.size = size
    if (minLabelSpacing) this.minLabelSpacing = minLabelSpacing
    if (zoomSpeed) this.zoomSpeed = zoomSpeed
  }
}