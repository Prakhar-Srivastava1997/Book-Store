import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  BASE_URL='http://localhost:3000/books';

  constructor(private http:HttpClient) { }

  addBook(data:Book):Observable<Book>{
    return this.http.post<Book>('http://localhost:3000/books', data).pipe(catchError(this.errorhandler));
  }

  errorhandler(error:HttpErrorResponse){
    return throwError(error.message || 'Server Error');
  }

  viewbook():Observable<Book[]>
{
  return this.http.get<Book[]>('http://localhost:3000/books').pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || 'Server Error')));
}

updateBook(data:string, result:Book):Observable<Book>{
  return this.http.put<Book>(`${this.BASE_URL}/${data}`, result).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
}

deleteBook(id:string):Observable<Book>{
  return this.http.delete<Book>(`${this.BASE_URL}/${id}`).pipe(catchError((error:HttpErrorResponse)=>throwError(error.message || "Server Error")));
}
}
