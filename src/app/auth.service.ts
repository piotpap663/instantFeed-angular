import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    // const userData = localStorage.getItem('userInfo');
    // if (userData && JSON.parse(userData)) {
    //   return true;
    // }
    // return false;
    return true;
  }

  public setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email, password) {
    return this.http.post('/api/login', { user: email, password }).toPromise();
    // return false;
  }
}
