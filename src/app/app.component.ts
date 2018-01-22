import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]
  labels: string[] = ['label1', 'label2', 'label3']
  colors: string[] = ['rgba(0,255,0,1)', 'rgba(0,255,0,0.5)']

  data2: number[] = [10,12,8,11,14,10,7,9,8,9,10,4,2,5,3,5,10]
  colors2: string[] = ['rgba(255,0,0,1)', 'rgba(255,0,0,0.5)']
}
