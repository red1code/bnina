import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/services/auth.guard';
import { FavoritsComponent } from './favorits.component';

const routes: Routes = [{ path: '', component: FavoritsComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritsRoutingModule { }
