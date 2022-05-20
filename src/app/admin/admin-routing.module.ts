import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { UpdatecustomerComponent } from './components/updatecustomer/updatecustomer.component';
import { ViewbooklistComponent } from './components/viewbooklist/viewbooklist.component';
import { ViewcustomerComponent } from './components/viewcustomer/viewcustomer.component';

const routes: Routes = [
  {path: '', component:AdminDashboardComponent},
  {path: 'addbook', component: AddbookComponent},
  {path: 'viewbooklist', component: ViewbooklistComponent},
  {path: 'viewcustomers', component: ViewcustomerComponent},
  {path: 'updatecustomer/:id', component: UpdatecustomerComponent},
  {path: 'updatebook/:id', component: UpdateBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
