import { Component, OnInit } from '@angular/core';
import { ServicesHttpService } from '../Services/services-http.service';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public listCoffee;
  public listTea;
  public testInMenu;

  constructor(private httpServices:ServicesHttpService  ) { }

  ngOnInit(): void {
    this.getListDrink();
  }

  //**********FUNCTIONS**********
  public getListDrink(){
    this.httpServices.getDataDrink().subscribe(list=>{
      this.listCoffee=list.Coffee;
      this.listTea=list.Teas;
    })
  }
}