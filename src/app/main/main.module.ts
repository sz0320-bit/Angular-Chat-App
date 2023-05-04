import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { PostComponent } from './post/post.component';


const routes: Routes = [

  {path: '', component: MainComponent},

];


@NgModule({
  declarations: [
    MainComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MainModule {
}
