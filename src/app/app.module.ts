import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {LayoutModule} from "@angular/cdk/layout";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import { StoreModule } from '@ngrx/store';
import * as fromGlobal from './reducers/index';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { httpInterceptorProviders } from './interceptors';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot(fromGlobal.reducers, { metaReducers: fromGlobal.metaReducers , }),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    MatNativeDateModule,
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
