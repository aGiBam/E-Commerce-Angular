import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface registerInterface {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
interface loginInterface {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  userDataSharedVar: any = null;

  constructor(private _HttpClient: HttpClient) {}

  sendRegister(registerData: registerInterface): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/auth/signup',
      registerData
    );
  }
  sendLogin(loginData: loginInterface): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + '/api/v1/auth/signin',
      loginData
    );
  }
  //on call take data from local storage
  saveData() {
    this.userDataSharedVar = localStorage.getItem('userToken');
    if (this.userDataSharedVar != null) {
      this.userDataSharedVar = jwtDecode(this.userDataSharedVar);
      console.log(this.userDataSharedVar);   
    }
  }
}
