import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddbookComponent } from './admin/components/addbook/addbook.component';
import { UpdateBookComponent } from './admin/components/update-book/update-book.component';
import { UpdatecustomerComponent } from './admin/components/updatecustomer/updatecustomer.component';
import { ViewbooklistComponent } from './admin/components/viewbooklist/viewbooklist.component';
import { ViewcustomerComponent } from './admin/components/viewcustomer/viewcustomer.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AuthUserGaurdGuard } from './gaurd/auth-user-gaurd.guard';
import { AuthGuard } from './gaurd/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrdersComponent } from './users/components/orders/orders.component';
import { PaymentComponent } from './users/components/payment/payment.component';
import { PurchaseComponent } from './users/components/purchase/purchase.component';
import { ViewbooksComponent } from './users/components/viewbooks/viewbooks.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'errorpage/:msg', component: ErrorpageComponent},
  {path: 'admin', loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule), canActivate:[AuthGuard]},
  {path: 'admin/addbook', component: AddbookComponent},
  {path: 'admin/viewbooklist', component: ViewbooklistComponent},
  {path: 'admin/viewcustomers', component: ViewcustomerComponent},
  {path: 'admin/updatecustomer', component: UpdatecustomerComponent},
  {path: 'admin/updatebook', component: UpdateBookComponent},
  {path: 'users', loadChildren:()=>import('./users/users.module').then((m)=>m.UsersModule), canActivate:[AuthUserGaurdGuard]},
  {path: 'users/viewbooks', component: ViewbooksComponent},
  {path: 'users/orders', component: OrdersComponent},
  {path: 'users/purchase', component: PurchaseComponent},
  {path: 'users/payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
