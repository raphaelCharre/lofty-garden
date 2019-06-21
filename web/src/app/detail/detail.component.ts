import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public objSerre: any;
  public plante;
  public chartTemp;
  public chartWatter;
  public chartLumos;
  public chartLight;
  public chartMoisture;

  private components = {
    fan: {
      value: 0
    },
    pump: {
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
    },
    {
      id: 'water_sensor',
      name: 'Water Sensor',
      event: 'WATER',
      data: [],
      labels: [],
      graph: null,
      scale: -100,
      color: 'rgba(0, 158, 255, 1)',
      bgColor: 'rgba(0, 158, 255, .1)'
    },
    {
      id: 'moisture_sensor',
      name: 'Moisture Sensor',
      event: 'MOISTURE',
      data: [],
      labels: [],
      graph: null,
      scale: -100,
      color: 'rgba(64, 164, 151, 1)',
      bgColor: 'rgba(64, 164, 151, .1)'
    },
    {
      id: 'temp_sensor',
      name: 'Temperature Sensor',
      event: 'TEMP',
      data: [],
      labels: [],
      graph: null,
      scale: -100,
      color: 'rgba(222, 22, 14, 1)',
      bgColor: 'rgba(222, 22, 14, .1)'
    },
    {
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

  private socket = null;

  @ViewChild('barChart', {static: true}) private chartRef1;
  @ViewChild('lineChart', {static: true}) private chartRef2;
  @ViewChild('zoulouChart', {static: true}) private chartRef3;
  @ViewChild('lightChart', {static: true}) private chartRef4;
  @ViewChild('watterChart', {static: true}) private chartRef5;

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

  initSocket = () => {
    this.socket = io('http://localhost:4201');
    this.socket.on('FAN', value => {
      this.components.fan.value = value;
    });
    this.socket.on('PUMP', value => {
      this.components.pump.value = value;
    });
  }

  graphTemp() {
    return new Chart(this.chartRef1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
          {
            label: 'température moyenne par mois',
            data: [3, 7, 7, 20, 22, 27],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  graphWatter() {
    return new Chart(this.chartRef2.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        datasets: [
          {
            label: 'consommation litre par jour',
            data: [12, 19, 2, 3, 3, 5],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  graphLumos() {
    return new Chart(this.chartRef3.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        datasets: [
          {
            label: 'dépense lumière par jour',
            data: [12, 5, 19, 3, 2, 3],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  graphHumidity() {
    return new Chart(this.chartRef4.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        datasets: [
          {
            label: 'humidité de la plante par jour',
            data: [3, 5, 2, 3, 12, 19],
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  graphMoisture() {
    return new Chart(this.chartRef5.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        datasets: [
          {
            label: 'humidité du sol par jour',
            data: [ 2, 3, 3, 12, 19, 5],
            backgroundColor: ['rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idSerre');
    this.plante = this.search(id, this.objSerre);
    this.chartTemp = this.graphTemp();
    this.chartWatter = this.graphWatter();
    this.chartLumos = this.graphLumos();
    // this.chartHumidity = this.graphHumidity();
    this.chartMoisture = this.graphMoisture();
  }
}
