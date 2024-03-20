import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/auth';
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain',
    }),
    responseType: 'text' as 'json',
  };

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') || '',
    });
  }

  loginCreds = {
    email: '',
    password: '',
  };

  login(email: string, password: string) {
    this.loginCreds.email = email;
    this.loginCreds.password = password;

    return this.http.post<string>(
      this.loginUrl + '/login',
      this.loginCreds,
      this.httpOptions
    );
  }
  getId(token: string) {
    const params = new HttpParams().append('token', token);
    return this.http.post<string>(this.loginUrl + '/id', null, {
      headers: this.getHeader(),
      params: params,
    });
  }

  getRole() {
    const token = localStorage.getItem('token');
    const params = new HttpParams().append('token', token || '');
    return this.http.post<string>(this.loginUrl + '/validate',null, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
      }),
      responseType: 'text' as 'json',
      params: params,
    });
  }

  register(userDetails: any): void {
    console.log(userDetails);
    this.http
      .post<any>(this.loginUrl + '/register', userDetails, this.httpOptions)
      .subscribe(
        (data) => {
          console.log('Successfully Registered ' + data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  logout() {
    const params = new HttpParams().append(
      'token',
      localStorage.getItem('token') || ''
    );
    return this.http.post<any>(this.loginUrl + '/logout', null, {
      headers: this.getHeader(),
      params: params,
    });
  }

  constructor(private http: HttpClient) {}
}
