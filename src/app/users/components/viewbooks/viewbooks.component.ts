import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookserviceService } from 'src/app/services/bookservice.service';
import { CartserviceService } from 'src/app/services/cartservice.service';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css']
})
export class ViewbooksComponent implements OnInit {

  booklist:Book[]=[];
  isItemAdded:boolean=false;

  constructor(private bookservice:BookserviceService, private cartserv:CartserviceService, private route:Router) { }

  ngOnInit(): void {
    this.bookservice.viewbook().subscribe(
      data =>{
        this.booklist=data;
      },
      error=>{
        alert(error.message);
      }
    )
  }

  additem(item:Book){
    this.cartserv.addBookToCart(item);
    this.isItemAdded=true;
  }

  viewCart(){
    this.route.navigate(['users/purchase']);
  }
}
