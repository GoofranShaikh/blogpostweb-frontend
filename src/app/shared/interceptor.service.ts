import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators'
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
isRefreshing:boolean=false;
refreshTokenSubject= new BehaviorSubject(null)
  constructor(private commonService:CommonService) { }

  intercept(request: HttpRequest<any>,
		next: HttpHandler):Observable<HttpEvent<any>>{
      console.log('interceptor')
      if(this.commonService.getAccessToken()){
       request= this.addTokenToHeader(request,this.commonService.getAccessToken())
      }
      return next.handle(request).pipe(catchError(error=>{
        if(error instanceof HttpErrorResponse && error.status==401 && this.commonService.getRefreshToken()){
          this.handle401Error(request,next)
        }
        return throwError(error)
      }))
    }

    addTokenToHeader(request:HttpRequest<any>,token:string){
      console.log(token,'token')
     return request.clone(
        {
          setHeaders:{
            'Authorization': `Bearer ${token}`
          }
        }
      )
     

    }

    handle401Error(request :HttpRequest<any>,next){
      
      if(!this.isRefreshing){
        this.isRefreshing=true;
        this.refreshTokenSubject.next(null)
        return this.commonService.getAccessfromRefresToken().pipe(switchMap((res: any) => {
          localStorage.setItem('accessToken',res.token)
					this.isRefreshing = false;
					this.refreshTokenSubject.next(res.token);
					return next.handle(this.addTokenToHeader(request,res.token));
				})).subscribe()
      }
      else{
        this.refreshTokenSubject.pipe(
          filter(token=>token !=null),
          take(1),
          switchMap(jwt=> next.handle(this.addTokenToHeader(request,jwt)))
        )
      }
    }
}
