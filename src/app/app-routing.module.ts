import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
