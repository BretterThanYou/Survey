import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { SurveyModule } from "survey-angular-ui";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GetComponent} from "./get/get.component";
import {PostComponent} from "./post/post.component";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    GetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SurveyModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
