import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/orders';
import { OrderserviceService } from 'src/app/services/orderservice.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  id:any;
  orderlist:Orders[]=[];

  constructor(private order:OrderserviceService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("UserId");
    this.order.getOrder().subscribe(
      data=>{
        data.forEach((res)=>{
          if(res.userid == this.id)
          {
            this.orderlist.push(res);
          }
        })
      },
      error=>{
        alert(error.message);
      }
    )
  }

}
