import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {

  errormsg:any;

  constructor(private aroute: ActivatedRoute, private route:Router, private location:Location) { }

  ngOnInit(): void {
   this.errormsg = this.aroute.snapshot.paramMap.get('msg');
  }

  goBack(){
    this.location.back();    //to go back to previous page
  }

}
