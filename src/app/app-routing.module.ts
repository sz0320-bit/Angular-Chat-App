import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./route-guards/auth.guard";
import {NonAuthGuard} from "./route-guards/non-auth.guard";

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [NonAuthGuard]
  },
  {
    path:'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [NonAuthGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
