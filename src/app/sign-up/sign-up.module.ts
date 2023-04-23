import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {SignUpComponent} from "./sign-up.component";

const routes: Routes = [

  {path: '', component: SignUpComponent},

];


@NgModule({
  declarations: [
    SignUpComponent,
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
export class SignUpModule { }
