import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  labels: string[] = [
    '01:00', '02:00', '03:00', '04:00', '05:00', '09:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00', '01:00',
  ]
  data: number[] = this.randomArray(26, 10, 0, 10000)
  colors: string[] = ['rgba(0,255,0,1)', 'rgba(0,255,0,0.5)', 'rgba(0,0,0,0.3)', 'black']
  fontSize: number = 12
  decimalPlaces: number = 1

  private randomArray(length, strength, min, max) {
    let output = []
    let start = (max - min) / 2
    for (let i = 0; i < length; i++) {
      start += Math.round((Math.random() - 0.5) * strength)
      output.push(start)
    }
    return output
  }
}
