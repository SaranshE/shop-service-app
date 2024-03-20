import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  getCategories() {
    return this.http.get<any>(this.productUrl+"/products/categories");
  }
  private productUrl = 'http://localhost:8080/product';
  constructor(private http: HttpClient) { }


getAllProducts(){
  return this.http.get<any>(this.productUrl + "/products");
}

}
