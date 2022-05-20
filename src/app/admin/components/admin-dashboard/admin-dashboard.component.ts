import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/orders';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { OrderserviceService } from 'src/app/services/orderservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminwallet:number=0;
  viewallorders:boolean=false;
  orderlist:Orders[]=[];

  constructor(private authserv:AuthserviceService, private route:Router, private order:OrderserviceService) { }

  ngOnInit(): void {

    this.order.getOrder().subscribe(
      data=>{
        this.orderlist = data;
        this.orderlist.forEach((res)=>{
          this.adminwallet+=parseInt(res.totalamount);
        })
      },
      error=>alert(error.message)
    )
  }

  heading=`WELCOME !!
           ..ADMIN..`

  logOut(){
    this.authserv.logOut();
  }   
  
  addbook(){
    this.route.navigate(['admin/addbook']);
  }

  viewbooks(){
    this.route.navigate(['admin/viewbooklist']);
  }

  viewcustomers(){
    this.route.navigate(['admin/viewcustomers']);
  }

  vieworders(){
    this.viewallorders = true;
  }

}
