import { Component, OnInit } from '@angular/core';
import { ServicesHttpService } from '../Services/services-http.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public stores;
  constructor(private httpService: ServicesHttpService ) { }

  ngOnInit(): void {
    this.httpService.stores$.subscribe(result=>{
      this.stores=result;
    })
  }

  public nothing() { };
 /* public showList() {
    (<HTMLBodyElement>document.querySelector('.list')).style.display = "flex";
    this.httpService.getDataStores().subscribe(result => {
      this.stores = result;
    })
  }*/
  public search() {
    let inputValue = ((<HTMLInputElement>document.querySelector('input[name="search"]'))).value;
    if (inputValue.length==0) {
      (<HTMLBodyElement>document.querySelector('.orderBar')).style.display = "block";
      (<HTMLBodyElement>document.querySelector('.list')).style.display = "none";
    } else {
      (<HTMLBodyElement>document.querySelector('.orderBar')).style.display = "none";
      this.httpService.getDataStores().subscribe(result => {
        let searchResult = result.filter(function (store) {
          return store.Name.toLowerCase().indexOf(inputValue.toLowerCase()) != -1
            || store.Address.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().indexOf(inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) != -1;
        });
        this.stores = searchResult;
        (<HTMLBodyElement>document.querySelector('.list')).style.display = "flex";
      })
    }
  }
}