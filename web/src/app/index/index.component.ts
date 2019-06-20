import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { 
    let nbr_serre = 3;
    let obj_serre = [
      {
        id_serre: 0,
        title: "fraise du bois de boulogne",
        description: "fraise au gout de miel frère",
        plantation_date: new Date('December 17, 2019 03:24:00')
      }, {
        id_serre: 1,
        title: "vernifuge amérindien",
        description: "plante gustative proposant la capacité de pimenter vos soirée",
        plantation_date: new Date('December 17, 2018 03:24:00')
      }, {
        id_serre: 2,
        title: "choux shiva",
        description: "espèce de choux descendant de la déesse shiva",
        plantation_date: new Date('December 17, 2017 03:24:00')
      }
    ];
  }

  ngOnInit() {
  }

}
