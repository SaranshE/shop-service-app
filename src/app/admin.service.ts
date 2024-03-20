import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  editUser(userToEdit: User) {
    return this.http.put<any>('http://localhost:8080/auth/admin/users/' + userToEdit.id,userToEdit,{headers:this.getHeader()})
  }
  
  editProduct(productToEdit: Product) {
    return this.http.put<any>('http://localhost:8080/product/admin/products/'+productToEdit.id,productToEdit,{headers:this.getHeader()});
  }
  deleteUser(id: number) {
    return this.http.delete('http://localhost:8080/auth/admin/users/' + id, {headers: this.getHeader()})
  }
  addProduct(value: Partial<{ name: string | null; description: string | null; price: number | null; category: string | null; }>) {
    return this.http.post<any>('http://localhost:8080/product/admin/products',value,{headers: this.getHeader()});
  }

  
  deleteProduct(id: number) {
    return this.http.delete('http://localhost:8080/product/admin/products/' + id, {headers: this.getHeader()})
  }
  
  getHeader(){
    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
  }




  getUsers() {
    return this.http.get<any>('http://localhost:8080/auth/admin/users',{headers: this.getHeader()})
  }

  constructor(private http: HttpClient) { }
}
