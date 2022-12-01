import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserAddressComponent } from './user-address/user-address.component';


@NgModule({
  declarations: [
    MyOrdersComponent,
    UserAddressComponent
  ],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    MatButtonModule,
    SharedModule
  ]
})
export class MyOrdersModule { }
