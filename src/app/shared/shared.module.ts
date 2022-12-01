import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { MapComponent } from './map/map.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NotificationComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [
    NotificationComponent,
    MapComponent
  ]
})
export class SharedModule { }
