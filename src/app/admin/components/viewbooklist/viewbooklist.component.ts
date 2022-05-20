import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookserviceService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-viewbooklist',
  templateUrl: './viewbooklist.component.html',
  styleUrls: ['./viewbooklist.component.css']
})
export class ViewbooklistComponent implements OnInit {

  booklist:Book[]=[];
  errormsg="";

  constructor(private bookserv: BookserviceService, private route:Router) { }

  ngOnInit(): void {

    this.bookserv.viewbook().subscribe(
      (data:Book[]) => this.booklist=data,
      error => this.errormsg=error
      
    )
  }

  trash(id:any){
    alert("Item Deleted");
    this.bookserv.deleteBook(id).subscribe(
      data =>{
        console.log(data);
        this.ngOnInit();
        //this.route.navigate(['admin/viewcustomers']);
      },error =>{
        this.route.navigate(['errorpage'], error.message);
      }
    )
  }

  edit(val:any){
    this.route.navigate(['admin/updatebook', val]);
  }



}
