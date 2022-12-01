import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/services/auth.guard';
import { MyOrdersComponent } from './my-orders.component';
import { UserAddressComponent } from './user-address/user-address.component';

const routes: Routes = [
  { path: '', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'user-address', component: UserAddressComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule { }
