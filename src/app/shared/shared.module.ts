import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { MapComponent } from './map/map.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
import { MealComponent } from './meal/meal.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NotificationComponent,
    MapComponent,
    LoaderComponent,
    MealComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    NotificationComponent,
    MapComponent,
    LoaderComponent,
    MealComponent
  ]
})
export class SharedModule { }
