import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ModeBarDefaultButtons, Config,newPlot } from "plotly.js";
import * as Plotly from 'plotly.js-dist'
// import * as Plotly from 'plotly.js/dist/plotly.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  @ViewChild("tester") ele: ElementRef;

  title = 'ploty';

  createData(xAxsisSize:number, yAxsisSize: number) {
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
  
   
  this.drawHeatMap(1000,1000, "Heatmap");
  }

  ngAfterViewInit(): void {
  }

drawHeatMap(xAxsisSize:number, yAxsisSize: number, title: string){
  const plotyHTMLEle = this.ele.nativeElement;
    const z = this.createData(xAxsisSize,yAxsisSize);
    var data = [
      {
        z,
        type: 'heatmap',
        // colorscale: [[0, "blue"],  [0.75, "orange"], [1, "red"]]
      }
    ];

    const layout = {
      title
    }


    const modeBarButtons: Array<Array<ModeBarDefaultButtons>> = [
      ["toImage"],
      ["autoScale2d"],
      ["pan2d"],
      ["resetViews"],
      ["zoom2d"], ["zoomIn2d"],
      ["zoomOut2d"],
      ["resetScale2d"],
      ["select2d"],
      ["tableRotation"],
      ["lasso2d"],
      ["orbitRotation"], 
      ["toggleHover"],
      ["pan3d"],
      ["toggleSpikelines"],
      ["hoverCompareCartesian"]
    ]

    const config:  Partial<Config> =  {
      displayModeBar: true, scrollZoom: true, displaylogo: false, responsive: true,
       modeBarButtons, autosizable: true, 
    }

    plotyHTMLEle.removeAllListeners((bla) => {
      alert(bla)
    });

    const heatmap = Plotly.newPlot(plotyHTMLEle, data as any, layout,config);
    this.addEventListnersHeatMap(plotyHTMLEle);
    
}



addEventListnersHeatMap(plotyHTMLEle){
  plotyHTMLEle.on('plotly_relayout', (event) => {
    console.log(  `$plotly_relayout ${JSON.stringify(event)}`);
   
    if (event["xaxis.autorange"]) {
      this.drawHeatMap(100, 100, "Heatmap zoom")
    } else if (this.isZoomEvent(event)) {
      this.drawHeatMap(3, 3, "Heatmap zoom")
    }
   })
}

isZoomEvent(event: Object): boolean{
  return Object.keys(event).some((key:string)=> key.includes("range["))
}


}
