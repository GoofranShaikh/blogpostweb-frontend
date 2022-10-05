import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { Login } from '../shared/models/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(private fb:FormBuilder,private commonService: CommonService) { }

  ngOnInit() {
    this.initForm()
  }
initForm(){
this.loginForm=this.fb.group({
  username:new FormControl(''),
  password:new FormControl('')
})
  }
  submit(){
    const payload:Login={
        email:this.loginForm.value.username,
        password:this.loginForm.value.password
      }
    
    this.commonService.login(payload).subscribe(res=>{
      if(res){
        this.storeUserDetails(res)
      }
    })
  }

  getWelcome(){
    this.commonService.testAuth({}).subscribe(res=>{
      console.log(res)
    })
  }

  storeUserDetails(response){
    localStorage.setItem('email',response.user.email)
    localStorage.setItem('accessToken',response.accessToken)
    localStorage.setItem('refreshToken',response.refreshToken)
  }
}
