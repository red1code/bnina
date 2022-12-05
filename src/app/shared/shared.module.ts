import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { MapComponent } from './map/map.component';
import { MatInputModule } from '@angular/material/input';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NotificationComponent,
    MapComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [
    NotificationComponent,
    MapComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
