import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { ViewbooklistComponent } from './components/viewbooklist/viewbooklist.component';
import { ViewcustomerComponent } from './components/viewcustomer/viewcustomer.component';
import { UpdatecustomerComponent } from './components/updatecustomer/updatecustomer.component';
import { FormsModule } from '@angular/forms';
import { UpdateBookComponent } from './components/update-book/update-book.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddbookComponent,
    ViewbooklistComponent,
    ViewcustomerComponent,
    UpdatecustomerComponent,
    UpdateBookComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
