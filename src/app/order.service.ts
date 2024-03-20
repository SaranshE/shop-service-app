import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:8080/orders';
  
  getHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
  }
  
  
  getOrders() {
    return this.http.get<any>(this.orderUrl + "/" + localStorage.getItem("userId"), {headers: this.getHeader()});
  }

  placeOrder() {
    return this.http.post<any>(this.orderUrl + "/" + localStorage.getItem("userId"),null, {headers: this.getHeader()});
  }


  constructor(private http: HttpClient) { }
}
