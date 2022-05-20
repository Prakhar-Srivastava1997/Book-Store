import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserServiceService } from 'src/app/services/auth-user-service.service';
import { Users } from 'src/app/users';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {

  id:any;
  updateForm:FormGroup;
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
    "id":""  };

  constructor(private route:Router, private aroute:ActivatedRoute, private formBuilder:FormBuilder, private userauth:AuthUserServiceService) { }

  ngOnInit(): void {

    this.id = this.aroute.snapshot.paramMap.get('id');

    this.updateForm=this.formBuilder.group({
      username:['',[Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email:['', [Validators.required, Validators.email]],
      address:['', [Validators.required, Validators.maxLength(50)]],
      pincode:['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  postData(updateForm:any){
    console.log("Form data : ",this.updateForm.controls);
    this.newuser.username=updateForm.controls['username'].value;
    this.newuser.password=updateForm.controls['password'].value;
    this.newuser.email=updateForm.controls['email'].value;
    this.newuser.address=updateForm.controls['address'].value;
    this.newuser.pincode=updateForm.controls['pincode'].value;
    
    this.userauth.updateUser(this.id, this.newuser).subscribe(
      data=>{alert("Data updated successfully!!");
             this.success=true;},
      error=>{
        this.errormsg=error;
        this.route.navigate(['errorpage', this.errormsg]);
      }
    )
    

  }

  alertsuccessbtn(){
    this.success=true;
    this.route.navigate(['admin/viewcustomers']);
  }

}
