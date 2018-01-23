import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  labels: string[] = ['01:00', '02:00', '03:00', '04:00', '05:00', '09:00', '06:00', '07:00', '08:00', '09:00']
  data: number[] = this.randomArray(10, 10, 0, 10000)

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
