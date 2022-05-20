import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ViewbooksComponent } from './components/viewbooks/viewbooks.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserDashboardComponent,
    ViewbooksComponent,
    OrdersComponent,
    PurchaseComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
