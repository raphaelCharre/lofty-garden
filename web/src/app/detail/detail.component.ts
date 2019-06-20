import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Chart } from "chart.js";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  public objSerre: any;
  public plante;
  public chartTemp: any;
  public chartWatter: any;
  public chartLumos: any;

  @ViewChild("barChart") private chartRef1;
  @ViewChild("lineChart") private chartRef2;
  @ViewChild("zoulouChart") private chartRef3;

  constructor(private route: ActivatedRoute) {
    this.objSerre = [
      {
        id: 0,
        title: "fraise du bois de boulogne",
        description: "fraise au gout de miel frère",
        plantationDate: new Date("December 17, 2019 03:24:00")
      },
      {
        id: 1,
        title: "vernifuge amérindien",
        description:
          "plante gustative proposant la capacité de pimenter vos soirée",
        plantationDate: new Date("December 17, 2018 03:24:00")
      },
      {
        id: 2,
        title: "choux shiva",
        description: "espèce de choux descendant de la déesse shiva",
        plantationDate: new Date("December 17, 2017 03:24:00")
      }
    ];
  }

  search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        return myArray[i];
      }
    }
  };

  graphTemp() {
    return new Chart(this.chartRef1.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
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
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
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
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
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
    let id = this.route.snapshot.paramMap.get("idSerre");
    this.plante = this.search(id, this.objSerre);
    this.chartTemp = this.graphTemp();
    this.chartWatter = this.graphWatter();
    this.chartLumos = this.graphLumos();
  }
}
