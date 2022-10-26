import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    let userDetails=this.getUserDetails()
    const payload={
      email:userDetails.user.email,
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
getMyBlogs(userid):Observable<any>{
  return this.http.post(`${environment.baseUrl}/blog-page/renderBlog`,userid)
}
getUserDetails(){
  return JSON.parse(localStorage.getItem('userdetails'))
}
}
