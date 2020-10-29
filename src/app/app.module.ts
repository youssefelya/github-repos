import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatDialogModule } from '@angular/material/dialog';
import { RepoDetailsComponent } from './repo-details/repo-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
