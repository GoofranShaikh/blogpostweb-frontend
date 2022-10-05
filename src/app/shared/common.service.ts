import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { 
  }

  login(request){
    return this.http.post(`${environment.baseUrl}/login`,request)
  }
  testAuth(request){
    return this.http.post(`${environment.baseUrl}/welcome`,request)
  }

  getAccessfromRefresToken(){
    const payload={
      email:localStorage.getItem('email'),
      refreshToken:this.getRefreshToken()
    }
    return this.http.post(`${environment.baseUrl}/refresh`,payload)
  }

  getAccessToken(){
    return localStorage.getItem('accessToken')
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
}
}
