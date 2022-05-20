import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookserviceService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  updateBook:FormGroup;
  bookName:string;
  ISBN_Number:string;
  author:string;
  category:string;
  price:string;
  pages:string;
  id:any;
  success:boolean;
  errormsg:string="";
  newBook:Book={
  "bookName":"",
  "ISBN_Number":"",
  "author":"",
  "category":"",
  "price":"",
  "pages":"",
  "id":""
  }

  constructor(private route:Router, private aroute:ActivatedRoute, private formbuilder:FormBuilder, private bkserv:BookserviceService) { }

  ngOnInit(): void {

    this.id=this.aroute.snapshot.paramMap.get('id');

    this.updateBook = this.formbuilder.group({
      bookName : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      ISBN_Number : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      author : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      category : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      price : ['', [Validators.required]],
      pages : ['', [Validators.required, Validators.maxLength(4), Validators.minLength(1)]]
    })
  }

  updatebook(updateBook:any){
       this.newBook.bookName = updateBook.controls['bookName'].value;
       this.newBook.ISBN_Number = updateBook.controls['ISBN_Number'].value;
       this.newBook.author = updateBook.controls['author'].value;
       this.newBook.category = updateBook.controls['category'].value;
       this.newBook.price = updateBook.controls['price'].value;
       this.newBook.pages = updateBook.controls['pages'].value;

       this.bkserv.updateBook(this.id, this.newBook).subscribe(
        data=>{alert("Data updated successfully!!");
        this.success=true;
        this.route.navigate(['admin/viewbooks']);
      },
        error=>{
              this.errormsg=error;
               this.route.navigate(['errorpage', this.errormsg]);
 }
       )
  }


}
