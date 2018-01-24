import { Component } from '@angular/core';

export class ChartOptions {
  colors: string[] = ['rgba(0,255,0,1)', 'rgba(0,255,0,0.5)', 'rgba(0,0,0,0.3)', 'black']
  fontSize: number = 12
  decimalPlaces: number = 1
  zoomSpeed: number = 100
  limits: number[] = [0, 0]
  offsets: number[] = [0.2, 0.2]
  dimensions: number[] = [1000, 600]
  minLabelSpacing: number = 10
  allowInput: boolean = true
  showGuides: boolean = true

  constructor(
    colors: string[],
    decimalPlaces: number,
    fontSize: number,
    limits: number[],
    offsets: number[],
    dimensions: number[],
    minLabelSpacing: number,
    zoomSpeed: number,
    showGuides: boolean,
    allowInput: boolean
  ) {
    if (colors !== undefined) this.colors = colors
    if (decimalPlaces !== undefined) this.decimalPlaces = decimalPlaces
    if (fontSize !== undefined) this.fontSize = fontSize
    if (limits !== undefined) this.limits = limits
    if (offsets !== undefined) this.offsets = offsets
    if (dimensions !== undefined) this.dimensions = dimensions
    if (minLabelSpacing !== undefined) this.minLabelSpacing = minLabelSpacing
    if (zoomSpeed !== undefined) this.zoomSpeed = zoomSpeed
    if (showGuides !== undefined) this.showGuides = showGuides
    if (allowInput !== undefined) this.allowInput = allowInput
  }
}
