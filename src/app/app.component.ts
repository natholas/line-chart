import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: number[] = this.randomArray(100, 10, 0, 10000)
  labels: string[] = ['label1', 'label2', 'label3']
  colors: string[] = ['rgba(0,255,0,1)', 'rgba(0,255,0,0.5)', 'rgba(0,0,0,0.3)', 'black']
  fontSize: number = 12
  decimalPlaces: number = 1;

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
