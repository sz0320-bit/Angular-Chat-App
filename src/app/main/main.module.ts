import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { PostComponent } from './post/post.component';
import { AddPostDialog } from './add-post-dialog/add-post-dialog.component';
import { ExpandedPostComponent } from './expanded-post/expanded-post/expanded-post.component';


const routes: Routes = [

  {path: '', component: MainComponent, data: {animation: 'Route1'}},
  {path: ':id', component: ExpandedPostComponent, data: {animation: 'Route2'}}

];


@NgModule({
  declarations: [
    MainComponent,
    PostComponent,
    ExpandedPostComponent,
    AddPostDialog,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MainModule {
}
