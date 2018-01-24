import { Injectable } from '@angular/core'

@Injectable()
export class ChartInputService {

  constructor() { }

  public setup(el: HTMLCanvasElement, limits, zoomSpeed, render: Function) {
    let dragging: boolean = false
    let previousPos: number = 0
    let touches: any = {}

    el.addEventListener('wheel', e => {
      let multiplier = el.offsetWidth / el.width
      let _limits = [
        limits[0] * multiplier,
        limits[1] * multiplier
      ]
      
      let width = el.offsetWidth - _limits[0] - _limits[1]
      let pos = width - (e.offsetX - _limits[0])
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
      previousPos = e.offsetX
      dragging = true
    })

    el.addEventListener('mouseup', e => {
      dragging = false
    })

    el.addEventListener('mousemove', e => {
      if (!dragging) return
      let multiplier = el.offsetWidth / el.width
      var diff = (e.offsetX - previousPos) / multiplier

      previousPos = e.offsetX
      if (limits[0] + diff > 0 || limits[1] - diff > 0) return
      limits[0] += diff
      limits[1] -= diff
      render()
    })

    el.addEventListener('touchstart', e => {
      touches = e.touches
    })

    el.addEventListener('touchmove', e => {
      let multiplier = el.offsetWidth / el.width
      if (Object.keys(e.touches).length === 1) {
        // moving
        let touch = e.touches[0]
        if (touches[touch.identifier]) {
          let diff = touch.clientX - touches[touch.identifier].clientX
          diff /= multiplier
          previousPos = touch.clientX
          if (limits[0] + diff > 0 || limits[1] - diff > 0) return
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
          let bounds = el.getBoundingClientRect()
          let posX1 = (touch1.clientX - bounds.left)
          let posX2 = (touch2.clientX - bounds.left)
          let _posX1 = (_touch1.clientX - bounds.left)
          let _posX2 = (_touch2.clientX - bounds.left)
          
          let diff1 = posX1 - _posX1
          let diff2 = posX2 - _posX2
          let leftDiff = posX1 < posX2 ? diff1 : diff2
          let rightDiff = posX1 >= posX2 ? diff1 : diff2
          
          let diff = leftDiff - rightDiff
          diff /= multiplier
          let total = Math.abs(rightDiff) + Math.abs(leftDiff)
          let pos = 1 / total * Math.abs(rightDiff)

          let leftPos = posX1 < posX2 ? posX1 : posX2
          let rightPos = posX1 >= posX2 ? posX1 : posX2
          leftPos /= multiplier
          rightPos /= multiplier
          leftPos -= limits[0]
          rightPos -= limits[0]

          let width = el.width - limits[0] - limits[1]
          let touchWidth = (rightPos - leftPos)
          let zoomCenter = leftPos + (touchWidth * pos)
          pos = 1 / width * zoomCenter

          if (!pos) return
          limits[0] += diff * (1 - pos)
          limits[1] += diff * pos

          if (limits[0] > 0) limits[0] = 0
          if (limits[1] > 0) limits[1] = 0

          render()
        }
      }
      touches = e.touches
    })

  }

}
