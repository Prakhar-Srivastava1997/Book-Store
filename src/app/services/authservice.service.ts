import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from '../users';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
isvalid:boolean;
  constructor(private http:HttpClient, private route:Router) {
   }

  createToken():string{
    var randString="";
    var charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    var i;
    for(i=0;i<charset.length;i++){
      randString += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return randString;
  }
  
  setToken(token:string):void{
    localStorage.setItem("Token", token);
  }

  getToken():string | null{
    return localStorage.getItem("Token");
  }

  isLoggedIn():boolean{
    return localStorage.getItem("Token")!=null;
  }

  logOut(){
    localStorage.removeItem("Token");
    this.route.navigate(['login']);
  }

  logIn(name:string, email:string):any{
    this.http.get<any>('http://localhost:3000/admin').subscribe((data:any)=>{
      if(name==data[0].username && email==data[0].email){
        var tkn = this.createToken();
        this.setToken(tkn);
        this.isvalid=true;
      }

      if(this.isvalid){
        this.route.navigate(['admin']);
      }else{
        alert("Failed to Login");
        this.route.navigate(['login']);
      }
  })
    
  }

  // addUser(data:Users):Observable<Users>{
  //   return this.http.post<Users>('http://localhost:3000/users', data).pipe(catchError(this.errorHandler));
  // }

  // errorHandler(error:HttpErrorResponse){
  //   return throwError(error.message || "Server Error");
  // }

  // userLogin():Observable<Users[]>{
  //   return this.http.get<Users[]>('http://localhost:3000/users');
  // }
}


