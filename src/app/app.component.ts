import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as Plotly from './plotly-latest.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  @ViewChild("tester") ele: ElementRef;

  title = 'ploty';

  createData() {
    const xAxsisSize = 100;
    const yAxsisSize = 100;
    let i = 0;
    let j = 0;

    let res = [];

    for (i = 0; i < xAxsisSize; ++i) {
      let temp = [];

      for (j = 0; j < yAxsisSize; ++j) {
        temp.push(Math.pow(i - j, 2))

      }
      res.push(temp)
    }


    return res;
  }


  ngOnInit(): void {
    const ele = this.ele.nativeElement;
    const z = this.createData();
    var data = [
      {
        z,
        type: 'heatmap',
        colorscale: [[0, "white"], [1, "black"]]
      }
    ];

    Plotly.newPlot(ele, data);
  }

  ngAfterViewInit(): void {
  }
}
