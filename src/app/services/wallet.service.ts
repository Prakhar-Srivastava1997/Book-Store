import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Wallet } from '../wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletobj:Wallet={
    "userid":"",
    "username":"",
    "amount":0
  }
 

  BASE_URL= "http://localhost:3000/wallet";

  constructor(private http:HttpClient) { }

  addmoney(id:string, name:string, amt:number):Observable<Wallet>{
    this.walletobj.userid = id;
    this.walletobj.username = name;
    this.walletobj.amount = amt;
    localStorage.setItem("UserWalletId",id);
    return this.http.post<Wallet>(this.BASE_URL, this.walletobj).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }

  

  getmoney():Observable<Wallet[]>{
    return this.http.get<Wallet[]>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "server Error")));
  }

  updateMoney(data:Wallet, id:string):Observable<Wallet>{
    return this.http.put<Wallet>(`${this.BASE_URL}/${id}`, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "server Error")));
  }
}
