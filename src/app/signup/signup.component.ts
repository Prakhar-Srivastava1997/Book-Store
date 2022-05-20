import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthUserServiceService } from '../services/auth-user-service.service';
import { Users } from '../users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  username:string;
  password:string;
  email:string;
  address:string;
  pincode:string;
  success:boolean=false;
  errormsg:string="";
  newuser:Users={
    "username":"",
    "password":"",
    "email":"",
    "address":"",
    "pincode":"",
    "id":""
  };

  constructor(private formBuilder:FormBuilder, private route:Router, private userauth:AuthUserServiceService) { }

  ngOnInit(): void {

    this.signupForm=this.formBuilder.group({
      username:['',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email:['', [Validators.required, Validators.email]],
      address:['', [Validators.required, Validators.maxLength(50)]],
      pincode:['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  postData(signupForm:any){
    console.log("Form data : ",this.signupForm.controls);
    this.newuser.username=signupForm.controls['username'].value;
    this.newuser.password=signupForm.controls['password'].value;
    this.newuser.email=signupForm.controls['email'].value;
    this.newuser.address=signupForm.controls['address'].value;
    this.newuser.pincode=signupForm.controls['pincode'].value;
    
    this.userauth.addUser(this.newuser).subscribe(
      data=>{
             this.success=true;},
      error=>{
        this.errormsg=error;
        this.route.navigate(['errorpage', this.errormsg]);
      }
    )
    

  }

  alertsuccessbtn(){
    this.success=true;
    this.route.navigate(['login']);
  }

}
