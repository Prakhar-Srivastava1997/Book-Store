import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserServiceService } from '../services/auth-user-service.service';
import { AuthserviceService } from '../services/authservice.service';
import { Users } from '../users';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  username:string="";
  email:string="";
  valid:boolean=false;

  constructor(private formbuilder: FormBuilder, private authserv:AuthserviceService, private route:Router, private userauth:AuthUserServiceService) { }

  ngOnInit(): void {

    this.loginForm=this.formbuilder.group({
      uname:['Enter User Name', [Validators.required,Validators.maxLength(20)]],
      emailId:['Enter Email Id', [Validators.required,Validators.email]],
      
    })

    if(this.authserv.isLoggedIn()){
      this.route.navigate(['admin']);
    }
    else if(this.userauth.isUserLoggedIn()){
      this.route.navigate(['users']);
    }
  }

  Submit(loginForm:any){
    console.log(this.loginForm.value);
    this.username = loginForm.controls['uname'].value;
    this.email = loginForm.controls['emailId'].value;
    if(this.username=='admin'){
      this.authserv.logIn(this.username, this.email);
    }
    else{
      this.userauth.userLogin(this.username, this.email).subscribe(
        (data: any)=>{
          console.log(data)
        },(error: { message: any; })=>{
          alert(error.message)
        }
      );
    }
  }

}
