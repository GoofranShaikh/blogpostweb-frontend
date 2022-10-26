import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorService } from '../interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
  ],
  providers:[
    InterceptorService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true
		},
  ],
  exports:[
    InterceptorService,
    NavbarComponent
  ]
})
export class SharedModule { }
