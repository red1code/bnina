import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { PAGES_PATH } from './models/models';

const routes: Routes = [
  {
    path: PAGES_PATH.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: PAGES_PATH.HOME,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: PAGES_PATH.FAVORITS,
    loadChildren: () => import('./pages/favorits/favorits.module').then(m => m.FavoritsModule),
    canLoad: [AuthGuard]
  },
  {
    path: PAGES_PATH.MY_ORDERS,
    loadChildren: () => import('./pages/my-orders/my-orders.module').then(m => m.MyOrdersModule),
    canLoad: [AuthGuard]
  },
  {
    path: PAGES_PATH.PROFILE,
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: PAGES_PATH.HOME,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
