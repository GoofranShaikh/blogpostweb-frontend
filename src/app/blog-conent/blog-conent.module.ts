import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { RouterModule, Routes } from '@angular/router';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { CommonService } from '../shared/common.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../shared/interceptor.service';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: 'fetchblogs',
    component:AllblogsComponent
  },
  {
    path:'myblogs',
    component:MyblogsComponent
  },
  {
    path:'blog',
    component:BlogDetailsComponent
  }
];


@NgModule({
  declarations: [AllblogsComponent, MyblogsComponent, BlogDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers:[CommonService,
    InterceptorService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      }
    ],
  exports: [RouterModule]
})
export class BlogConentModule { }
