import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesHttpService {
  public server="http://localhost:3000/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'mapplication/json',//Kiểu dữ liệu trả về
     })
  };//Tạo header trên Angular
  public stores$=new BehaviorSubject([]);
  
  constructor( private httpCilent: HttpClient) { }

  //**********FUNCTIONS***********

  // Hàm gọi và lấy dữ liệu từ API url
  public getDataStores(): Observable<any>{
      let url =`${this.server}`+`Outlets`;
      return this.httpCilent
      .get<any>(url,this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getDataDrink(): Observable<any>{
    let url = `${this.server}`+`Drink` ;
    return this.httpCilent
    .get<any>(url ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  //Hàm post dữ liệu lên server
  public postData(data,link): Observable<any>{
    const url=link;
    return this.httpCilent
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
}
  //Hàm báo lỗi 
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
