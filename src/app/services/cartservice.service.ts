import { Injectable } from '@angular/core';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  totalBoks:Book[]=[];
  index:number;

  constructor() { }

  addBookToCart(obj:Book){
    this.totalBoks.push(obj);
  }

  getBookFromcart():Book[]{
    return this.totalBoks;
  }

  removeBook(data:Book):string{
    if(this.totalBoks.length>0){
      this.index=this.totalBoks.indexOf(data);
      this.totalBoks.splice(this.index, 1);
    }
    return "Sorry ! Your cart is empty";

  }

  clearcart(){
    this.totalBoks = [];
  }

}
