import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ViewbooksComponent } from './components/viewbooks/viewbooks.component';

const routes: Routes = [
  {path: '', component: UserDashboardComponent},
  {path: 'viewbooks', component: ViewbooksComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'purchase', component: PurchaseComponent},
  {path: 'payment', component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
