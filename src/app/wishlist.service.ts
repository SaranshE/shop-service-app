import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistUrl = 'http://localhost:8080/wishlist';

  getHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
  }

  getWishlist(){
    return this.http.get<any>(
      this.wishlistUrl + '/' + localStorage.getItem('userId'),{headers: this.getHeader()} 
    );
  }
  removeFromWishlist(num: number) {
    return this.http.delete<any>(
      this.wishlistUrl +
        '/' +
        localStorage.getItem('userId') +
        '/remove/' +
        num,
      {headers: this.getHeader()}
    );
  }
  addToWishlist(num: number)
  {
    const params = new HttpParams().append('productId', num);
    return this.http.post<any>(this.wishlistUrl + "/" + localStorage.getItem('userId'), null, {headers: this.getHeader(), params: params})
  }



  constructor(private http: HttpClient) {}
}
