import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./login.component";

const routes: Routes = [

  {path: '', component: LoginComponent},

];


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ],
  exports:[
    RouterModule
  ],
})
export class LoginModule { }
