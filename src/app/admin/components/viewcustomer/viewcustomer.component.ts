import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserServiceService } from 'src/app/services/auth-user-service.service';
import { Users } from 'src/app/users';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {

  usersList:Users[]=[];
  errormsg="";

  constructor(private authuser:AuthUserServiceService, private route:Router) { }

  ngOnInit(): void {
    this.authuser.viewuser().subscribe(
      data => this.usersList=data,
      error => this.errormsg =error
    )
  }

  trash(id:any){
    alert("Item Deleted");
    this.authuser.deleteUser(id).subscribe(
      data =>{
        console.log(data);
        this.ngOnInit();
        //this.route.navigate(['admin/viewcustomers']);
      },error =>{
        this.route.navigate(['errorpage'], error.message);
      }
    )
  }

  edit(val:any){
    this.route.navigate(['admin/updatecustomer', val]);
  }

}
