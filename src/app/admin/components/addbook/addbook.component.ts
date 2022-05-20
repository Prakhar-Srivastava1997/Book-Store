import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/book';
import { BookserviceService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  addBookForm:FormGroup;
  bookName:string="";
  ISBN_Number:string="";
  author:string="";
  category:string="";
  price:string="";
  pages:string="";
  book:Book={
    "bookName" :"",
    "ISBN_Number" :"", 
    "author" :"", 
    "category" : "",
    "price":"",
    "pages" : "",
    "id":""
  };
  errormsg:string;
  valid:boolean;

  constructor(private formbuilder:FormBuilder, private bookserv:BookserviceService) { }

  ngOnInit(): void {
    this.addBookForm = this.formbuilder.group({
      bookName : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      ISBN_Number : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      author : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      category : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      price: ['', [Validators.required]],
      pages : ['', [Validators.required, Validators.maxLength(4), Validators.minLength(1)]]
    })
  }

  addBook(addBookForm:any){
    console.log(addBookForm.controls.value);
    this.book.bookName = addBookForm.controls['bookName'].value;
    this.book.ISBN_Number = addBookForm.controls['ISBN_Number'].value;
    this.book.author = addBookForm.controls['author'].value;
    this.book.category = addBookForm.controls['category'].value;
    this.book.price = addBookForm.controls['price'].value;
    this.book.pages = addBookForm.controls['pages'].value;
  
    this.bookserv.addBook(this.book).subscribe(
      data=>{
        console.log(data);
        this,this.valid=true;
      },
      error=>{
        this.errormsg = error;
        this.valid=false;
      }
    )
  }

}
