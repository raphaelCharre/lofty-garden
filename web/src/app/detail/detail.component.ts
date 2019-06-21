import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Chart } from "chart.js";
import { io } from "socket.io-client";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public objSerre: any;
  public plante;
  private components = {
    fan : {
        value: 0
    },
    pump : {
        value: 0
    }
  };

  private charts = [
    {
        id: 'light_sensor',
        name: 'Light sensor',
        event: 'LIGHT',
        data: [],
        labels: [],
        graph: null,
        scale: -100,
        color: 'rgba(255, 167, 0, 1)',
        bgColor: 'rgba(255, 167, 0, .1)'
    },{
        id: 'water_sensor',
        name: 'Water Sensor',
        event: 'WATER',
        data: [],
        labels: [],
        graph: null,
        scale: -100,
        color: 'rgba(0, 158, 255, 1)',
        bgColor: 'rgba(0, 158, 255, .1)'
    },{
        id: 'moisture_sensor',
        name: 'Moisture Sensor',
        event: 'MOISTURE',
        data: [],
        labels: [],
        graph: null,
        scale: -100,
        color: 'rgba(64, 164, 151, 1)',
        bgColor: 'rgba(64, 164, 151, .1)'
    },{
        id: 'temp_sensor',
        name: 'Temperature Sensor',
        event: 'TEMP',
        data: [],
        labels: [],
        graph: null,
        scale: -100,
        color: 'rgba(222, 22, 14, 1)',
        bgColor: 'rgba(222, 22, 14, .1)'
    },{
        id: 'humidity_sensor',
        name: 'Humidity Sensor',
        event: 'HUMIDITY',
        data: [],
        labels: [],
        graph: null,
        scale: -100,
        color: 'rgba(125, 206, 232, 1)',
        bgColor: 'rgba(125, 206, 232, .1)'
    }
];

private socket= null;

  @ViewChild("barChart", {static: false}) private chartRef1;
  @ViewChild("lineChart", {static: false}) private chartRef2;
  @ViewChild("zoulouChart", {static: false}) private chartRef3;

  constructor(private route: ActivatedRoute) {
    this.objSerre = [
      {
        id: 0,
        title: 'fraise du bois de boulogne',
        description: 'fraise au gout de miel frère',
        plantationDate: new Date('December 17, 2019 03:24:00')
      },
      {
        id: 1,
        title: 'vernifuge amérindien',
        description:
          'plante gustative proposant la capacité de pimenter vos soirée',
        plantationDate: new Date('December 17, 2018 03:24:00')
      },
      {
        id: 2,
        title: 'choux shiva',
        description: 'espèce de choux descendant de la déesse shiva',
        plantationDate: new Date('December 17, 2017 03:24:00')
      }
    ];
  }

  search = (nameKey, myArray) => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i];
      }
    }
  }

  initSocket = ()=>{
    this.socket = io('http://localhost:4201');
    this.socket.on('FAN', value=>{
      this.components.fan.value = value;
    });
    this.socket.on('PUMP', value=>{
        this.components.pump.value = value;
    });
  };

  initCharts = ()=>{
    for(const chart of this.charts){
      var chart_dom_element = <HTMLCanvasElement> document.getElementById(chart.id);
      var ctx = chart_dom_element.getContext('2d');
      chart.graph = new Chart(ctx, {
          type: 'line',
          data: {
              labels: [],
              datasets: []
          },
          options : {
              animation : {
                  duration: 0
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                          //color: '#555'
                      },
                      ticks :{
                          //fontColor: '#aaa',
                          fontSize: 14
                      }
                  }],
                  yAxes: [{
                      gridLines: {
                          //color: '#555'
                      },
                      ticks: {
                          //fontColor: '#aaa',
                          fontSize: 14
                      }
                  }]
              }

          }
      });

      this.socket.on(chart.event, function(value, label){
          chart.data.push(value);
          chart.labels.push(label);

          chart.graph.data.labels = chart.labels.slice(chart.scale);
          chart.graph.data.datasets = [{
              data : chart.data.slice(chart.scale),
              borderColor: chart.color,
              backgroundColor: chart.bgColor,
              fill: true,
              label: chart.name,
              
          }];
          chart.graph.update();
      })
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idSerre');
    this.plante = this.search(id, this.objSerre);
    this.initSocket();
    this.initCharts();
  }
}
