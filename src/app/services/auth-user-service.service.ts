import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Users } from '../users';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserServiceService {
  valid: boolean;

  constructor(private http: HttpClient, private route:Router) { }

  BASE_URL="http://localhost:3000/users";

  createUserToken():string{
    var randString="";
    var charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    var i;
    for(i=0;i<charset.length;i++){
      randString += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return randString;
  }
  
  setUserToken(token:string):void{
    localStorage.setItem("UserToken", token);
  }

  getUserToken():string | null{
    return localStorage.getItem("UserToken");
  }

  isUserLoggedIn():boolean{
    return localStorage.getItem("UserToken")!=null;
  }

  userlogOut(){
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserId");
    this.route.navigate(['login']);
  }

  addUser(data:Users):Observable<Users>{
    return this.http.post<Users>('http://localhost:3000/users', data).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  userLogin(name:string, email:string):any{
    this.http.get<Users[]>('http://localhost:3000/users').subscribe((data:Users[])=>{
      for(let i=0;i<data.length;i++){
        if(name == data[i].username && email == data[i].email){
          var tkn = this.createUserToken();
          this.setUserToken(tkn);
          localStorage.setItem("UserId", data[i].id);
          this.valid=true;
          break;
        }
        else{
          continue;
        }
      }
      if(this.valid){
        localStorage.setItem("UserName", name);
        this.route.navigate(['users']);
      }
      else{
        alert("Wrong credentials! Try again");
        this,this.route.navigate(['login']);
      }
    })
  }

  viewuser():Observable<Users[]>{
    return this.http.get<Users[]>('http://localhost:3000/users').pipe(catchError((error: HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }

  updateUser(data:string, result:Users):Observable<Users>{
    return this.http.put<Users>(`${this.BASE_URL}/${data}`, result).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }

  deleteUser(id:string):Observable<Users>{
    return this.http.delete<Users>(`${this.BASE_URL}/${id}`).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }

  getUser():Observable<Users[]>{
    return this.http.get<Users[]>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }
}
