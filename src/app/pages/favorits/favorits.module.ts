import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritsRoutingModule } from './favorits-routing.module';
import { FavoritsComponent } from './favorits.component';


@NgModule({
  declarations: [
    FavoritsComponent
  ],
  imports: [
    CommonModule,
    FavoritsRoutingModule
  ]
})
export class FavoritsModule { }
