import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Orders } from '../orders';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  BASE_URL = "http://localhost:3000/orders";
  constructor(private http:HttpClient) { }

  addOrder(data:Orders):Observable<Orders>{
    return this.http.post<Orders>(this.BASE_URL, data).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }

  getOrder():Observable<Orders[]>{
    return this.http.get<Orders[]>(this.BASE_URL).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
  }
}
