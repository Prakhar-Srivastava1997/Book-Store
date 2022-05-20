import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/book';
import { Orders } from 'src/app/orders';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Wallet } from 'src/app/wallet';
import {CartserviceService} from '../../../services/cartservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  name:any;
  walletobj:Wallet={
    "userid":"",
    "username":"",
    "amount":0
  }  
  order:Orders={
    "username":"",
    "userid":"",
    "totalquantity":"",
    "totalamount":"",
    "orderdate":""
  };
  totalamount:any;
  booklist:Book[]=[];
  paymentForm:FormGroup;
  amountInWallet:number;
  id:any;
  constructor(private formBuilder:FormBuilder, private cartserv:CartserviceService, private orderserv:OrderserviceService, private walletserv:WalletService, private route:Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("UserName");
    this.id = localStorage.getItem("UserId");
    this.totalamount = localStorage.getItem("billAmount");
    this.paymentForm = this.formBuilder.group({
      cardHolderName:['', [Validators.required]],
      cardNumber:['', [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^[0-9]+$/)]],
      cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]],
      expiry:['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]]
    })

    this.walletserv.getmoney().subscribe(
      data=>{
        data.forEach((res)=>{
          if(res.userid == this.id){
            this.amountInWallet = res.amount;
          }
        })
      },
      error=>{
        console.log(error.message);
      }
    )
  }

  orderNow(){
      this.booklist = this.cartserv.getBookFromcart();
      this.order.username = this.name;
      this.order.userid = this.id;
      this.order.totalquantity = this.booklist.length.toString();
      this.order.totalamount = this.totalamount;
      this.order.orderdate = new Date().toDateString();

      this.orderserv.addOrder(this.order).subscribe(
        data=>{
          this.amountInWallet = this.amountInWallet - parseInt(this.totalamount);
          console.log("Money left : ", this.amountInWallet);
          this.walletobj.userid = this.id;
          this.walletobj.username = this.name;
          this.walletobj.amount = this.amountInWallet;
          this.walletserv.updateMoney(this.walletobj, this.id).subscribe(
            data=>console.log(data),
            error=>console.log(error.message)
          );
          alert("Bravo ! Order palced successfully");
          this.cartserv.clearcart();
          this.route.navigate(['users']);
        }, error=>{
          alert(error.message);
        }
      )
  }

}
