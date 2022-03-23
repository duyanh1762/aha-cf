import { Component, OnInit } from '@angular/core';
import { ServicesHttpService } from './Services/services-http.service';{}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'aha-cafe-project';
  public datas;

  constructor(private serverHttp: ServicesHttpService) {
  }//khai báo serverHttp có kiểu dữ liệu = ServerHTTPService vừa nạp để dùng

  ngOnInit(): void {//Những công việc được làm khi tải web
  }

  //**********FUNCTIONS***********
  
    /*fetch('http://localhost:3000/Outlets', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });*/
      public search() {
        var inputValue = (<HTMLInputElement>document.querySelector('input[name="search"]')).value;
        this.serverHttp.getDataStores().subscribe((result) => {
            var resultSearch = result.filter(function (data) {
              return data.Name.toLowerCase().indexOf(inputValue.toLowerCase()) != -1
                || data.Address.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().indexOf(inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()) != -1            
            })
            this.datas = resultSearch;
          })
      }
    }
    
    /*var ahaDataPromise = fetch('https://api.ahacafe.vn/pos.customers.generalinfo?shark=null&fbclid=IwAR22Y1z2pjEGFcfXZqGydnNeeaae1O2-GZ9RhjGw4qWL-2uikx2UMyJksKs');
    ahaDataPromise.then(function (response) {
      return response.json();
    })
    .then(function(x){
      console.log(x.Outlets)
    })
      .then(function (result) {
        return result.Outlets;
      })
      .then(function (result) {
        var  stores = result.map(function (store) {
          return {
            name: store.Name,
            address: store.Address,
            hotline:store.Hotline
          }
        })
        var storesHTML=stores.map(function(store){
          return `<div>
                   <h2>${store.name}</h2>
                   <h3>${store.address}</h3>
                   <h3>${store.hotline}</h3>
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbEh5XF7SSqg-FiSahKABPXu6aQroEr9_Gj4HL0NzJD4pb4N6s2MkQuyYboVqIVfMndi4&usqp=CAU"/>
                  </div>`
        })
        let container=document.querySelector('.container');
        if(container){
          container.innerHTML=storesHTML.join("");
        }
      })
}*/