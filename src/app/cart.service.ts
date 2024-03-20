import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  

  private cartUrl = 'http://localhost:8080/cart';
  constructor(private http: HttpClient) { }

  getHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
  }

  getCart(){
    return this.http.get<any>(
      this.cartUrl + '/' + localStorage.getItem('userId'),{headers: this.getHeader()} 
    );
  }
  removeFromCart(num: number) {
    return this.http.delete<any>(
      this.cartUrl +
        '/' +
        localStorage.getItem('userId') +
        '/remove/' +
        num,
      {headers: this.getHeader()}
    );
  }
  addToCart(num: number)
  {
    const params = new HttpParams().append('productId', num);
    return this.http.post<any>(this.cartUrl + "/" + localStorage.getItem("userId") + "/add", null, {headers: this.getHeader(), params: params})
  }

  clearCart()
  {
    return this.http.delete<any>(this.cartUrl + "/" + localStorage.getItem("userId") + "/clear", {headers: this.getHeader()})
  }

}
