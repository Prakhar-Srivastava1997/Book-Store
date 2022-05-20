import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  para:string=`Welcome to our Book Store. We are one of the leading book stores available online. Mr.Prakhar
               Srivastava, owner of the store is a B.TECH graduate passed in 2020. Currently he is working 
               with Infosys as a System Engineer. He established this store in 2020.`
              
               
  Back(){
      this.route.navigate(['home']);
  } 
}
