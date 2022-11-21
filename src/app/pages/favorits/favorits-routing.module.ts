import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritsComponent } from './favorits.component';

const routes: Routes = [{ path: '', component: FavoritsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritsRoutingModule { }
