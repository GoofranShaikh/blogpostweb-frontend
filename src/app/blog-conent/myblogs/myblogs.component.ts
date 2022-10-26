import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { blogDetails } from 'src/app/shared/models/model';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.scss']
})
export class MyblogsComponent implements OnInit {
userdetails:any;
blogDetails:blogDetails;
  constructor(private commonservice: CommonService,private router:Router) { }

  ngOnInit() {
    this.userdetails=this.commonservice.getUserDetails()
    let payload={
      userid:this.userdetails.user._id
    }
    this.commonservice.getMyBlogs(payload).subscribe((res:blogDetails)=>{
      this.blogDetails=res
    })
  }

  openBlog(item){
    this.router.navigate(
      ['/blogs/blog'],
      { queryParams: { id: item._id } }
    );
  }

}
