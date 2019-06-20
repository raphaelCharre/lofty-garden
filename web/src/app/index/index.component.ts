import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { 
    const nbrSerre = 3;
    const objSerre = [
      {
        id: 0,
        title: "fraise du bois de boulogne",
        description: "fraise au gout de miel frère",
        plantationDate: new Date('December 17, 2019 03:24:00')
      }, {
        id: 1,
        title: "vernifuge amérindien",
        description: "plante gustative proposant la capacité de pimenter vos soirée",
        plantationDate: new Date('December 17, 2018 03:24:00')
      }, {
        id: 2,
        title: "choux shiva",
        description: "espèce de choux descendant de la déesse shiva",
        plantationDate: new Date('December 17, 2017 03:24:00')
      }
    ];
  }

  ngOnInit() {
  }

}
