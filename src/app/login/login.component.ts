import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesHttpService } from '../Services/services-http.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginResult;
  public ahaLoginForm = new FormGroup({//Tạo 1 formgroup ahaLogin có các formcontrol ... (formgroup=level cao nhất,formcontrol=level thấp nhất)
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  public testInLogin;
  //https://api.ahacafe.vn/RMS:Login    
  constructor(private httpServices: ServicesHttpService) { }

  ngOnInit(): void {

  }
  onSubmit() {
    fetch("https://api.ahacafe.vn/RMS:Login  ", {
      "method": "POST",
      "body": JSON.stringify({
        Data: {
          Username: this.ahaLoginForm.controls.userName.value,
          Password: this.ahaLoginForm.controls.password.value,
          Type: 3
        }
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.loginResult=result;
        console.log(this.loginResult.Data.CredentialID);
        const _bod = {
          CredentialID: this.loginResult.Data.CredentialID,
          CredentialType: 3
        }
        console.log(_bod);
        fetch("https://api.ahacafe.vn/cfg.shop.list", {
          "body": JSON.stringify(_bod),
          "method": "POST",
          "headers": { "accept": "application/json,text/plain,*/*", "content-type": "text/plain", }
        })
          .then(function (response) {
            return response.json();
          })
          .then(result=>{
            console.log(result.Data);
            this.httpServices.stores$.next(result.Data);
          })
      })
      .catch(function () {
        console.log("Không thể đăng nhập!!!")
      })
  }
}