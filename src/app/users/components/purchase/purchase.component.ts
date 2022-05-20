import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/book';
import { AuthUserServiceService } from 'src/app/services/auth-user-service.service';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Users } from 'src/app/users';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  bkarray:Book[]=[];
  name:any;
  address:string;
  userlist:Users[]=[];
  index:number;
  totalamt:number=0;
  id:any;

  constructor(private cartserv:CartserviceService, private userserv:AuthUserServiceService, private walletserv:WalletService, private route:Router) {
    this.userserv.getUser().subscribe(
      data=>{
        this.userlist=data;
        this.userlist.forEach((res)=>{
          if(res.username == this.name){
            this.address = res.address;
          }
        })
      },
      error=>alert(error.message)
    )
   }

  ngOnInit(): void {
    this.name = localStorage.getItem("UserName");
    this.bkarray = this.cartserv.getBookFromcart();
    this.bkarray.forEach((res)=>{
      this.totalamt+=parseInt(res.price);
    })


  }

  removeItem(data:any){
    this.index = this.bkarray.indexOf(data);
    this.bkarray.splice(this.index, 1);
    this.totalamt=0;
    this.ngOnInit();
  }

  proceedToPay(){
    this.id = localStorage.getItem("UserId");
     this.walletserv.getmoney().subscribe(
       data=>{
         data.forEach((res)=>{
           if(res.userid == this.id){
            if(this.totalamt<=res.amount){
              localStorage.setItem("billAmount", this.totalamt.toString());
              this.route.navigate(['users/payment']);
           }
           else{
            alert("Sorry ! Insufficient Balance");
            this.route.navigate(['users']);
           }
          }
         })
         
        //  if(this.totalamt<=data.amount){
        //    localStorage.setItem("billAmount", this.totalamt.toString());
        //    this.route.navigate(['users/payment']);
        //  }
         
       }
     )
  }

}
