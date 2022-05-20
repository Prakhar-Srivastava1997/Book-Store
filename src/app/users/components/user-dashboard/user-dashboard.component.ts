import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserServiceService } from 'src/app/services/auth-user-service.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Wallet } from 'src/app/wallet';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  username:any;
  id:any;
  balance:number;
  addMoneyRequired:boolean=false;
  addMoneyForm:FormGroup;
  walletarray:Wallet[]=[];
  validdata:boolean=false;
  currentbalance:number;
  walletobj:Wallet={
    "username":"",
    "userid":"",
    "amount":0
  }
  

  constructor(private aroute:ActivatedRoute, private userauth:AuthUserServiceService, private route:Router, private wallet:WalletService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("UserName");
    this.id = localStorage.getItem("UserId");
    this.wallet.getmoney().subscribe(
      data=>{
               data.forEach((res)=>{
                 if(res.userid == this.id){
                   this.balance = res.amount;
                 }
               })
      },
      error =>{
        this.balance=0;
      }
    )
  }

  viewbook(){
    this.route.navigate(['users/viewbooks']);
  }

  vieworder(){
    this.route.navigate(['users/orders']);
  }

  logout(){
    this.userauth.userlogOut();
  }

  addmoney(){
    this.addMoneyRequired = true;
    this.addMoneyForm = this.formbuilder.group({
      amount:['', [Validators.required]]
    })
  }

  depositMoney(addMoneyForm:any){
    this.balance = addMoneyForm.controls['amount'].value;
    this.wallet.getmoney().subscribe(
      data=>{
        this.walletarray = data;
        this.walletarray.forEach((res)=>{
          if(res.userid == this.id){
            this.currentbalance = res.amount;
            this.validdata = true;
          }
        })
        if(this.validdata){
            this.walletobj.username = this.username;
            this.walletobj.userid = this.id;
            this.walletobj.amount = this.currentbalance + this.balance;
            this.wallet.updateMoney(this.walletobj, this.id).subscribe(
              data=>{console.log(data);
                this.addMoneyRequired = false;
              window.location.reload()},
              error=>console.log(error.message)
            )
          }
          else{
            this.wallet.addmoney(this.id, this.username, this.balance).subscribe(
                data=>{console.log(data);
                  this.addMoneyRequired = false;
                  window.location.reload();
                },
                error=>console.log(error.message)
              )
          }
      },error=>{
        alert(error.message);
      }
      
    )
    
  }


}
