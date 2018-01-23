import { Injectable } from '@angular/core';

@Injectable()
export class ChartInputService {

  constructor() { }

  public setup(el: HTMLCanvasElement, limits, zoomSpeed, render: Function) {
    let dragging: boolean = false
    let previousPos: number = 0
    let touches: any = {}

    el.addEventListener('wheel', e => {
      let width = el.offsetWidth - limits[0] - limits[1]
      let pos = width - (e.clientX - limits[0])
      pos = 1 / width * pos
      if (e.deltaY < 0) {
        limits[0] -= zoomSpeed * (1 - pos)
        limits[1] -= zoomSpeed * pos
      } else {
        limits[0] += zoomSpeed * (1 - pos)
        limits[1] += zoomSpeed * pos
      }
      if (limits[0] > 0) limits[0] = 0
      if (limits[1] > 0) limits[1] = 0
      render()
      e.preventDefault()
    })

    el.addEventListener('mousedown', e => {
      previousPos = e.clientX
      dragging = true
    })

    el.addEventListener('mouseup', e => {
      dragging = false
    })

    el.addEventListener('mousemove', e => {
      if (!dragging) return
      var diff = e.clientX - previousPos
      previousPos = e.clientX
      if (limits[0] + diff > 0 || limits[1] - diff > 0) return;
      limits[0] += diff
      limits[1] -= diff
      render()
    })

    el.addEventListener('touchstart', e => {
      touches = e.touches
    })

    el.addEventListener('touchmove', e => {
      if (Object.keys(e.touches).length === 1) {
        // moving
        let touch = e.touches[0]
        if (touches[touch.identifier]) {
          let diff = touch.clientX - touches[touch.identifier].clientX
          diff *= 2
          previousPos = touch.clientX
          if (limits[0] + diff > 0 || limits[1] - diff > 0) return;
          limits[0] += diff
          limits[1] -= diff
          render()
        }
      } else {
        // zooming

        let touch1 = e.touches[0]
        let touch2 = e.touches[1]
        let _touch1 = touches[touch1.identifier]
        let _touch2 = touches[touch2.identifier]

        if (_touch1 && _touch2) {
          let diff1 = touch1.clientX - _touch1.clientX
          let diff2 = touch2.clientX - _touch2.clientX
          let leftDiff = touch1.clientX < touch2.clientX ? diff1 : diff2
          let rightDiff = touch1.clientX >= touch2.clientX ? diff1 : diff2
          let diff = leftDiff - rightDiff
          diff *= 4
          let total = Math.abs(rightDiff) + Math.abs(leftDiff)
          let pos = 1 / total * Math.abs(rightDiff)

          let leftPos = touch1.clientX < touch2.clientX ? touch1.clientX : touch2.clientX
          let rightPos = touch1.clientX >= touch2.clientX ? touch1.clientX : touch2.clientX
          
          let width = el.offsetWidth
          let touchWidth = rightPos - leftPos
          let zoomCenter = leftPos + (touchWidth * pos)
          pos = 1 / el.offsetWidth * zoomCenter

          if (!pos) return
          limits[0] += diff * (1 - pos)
          limits[1] += diff * pos

          if (limits[0] > 0) limits[0] = 0
          if (limits[1] > 0) limits[1] = 0

          render()
        }
      }
      touches = e.touches
      e.preventDefault()
    })

  }

}
