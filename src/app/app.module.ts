import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppLoginFormComponent } from './app-login-form/app-login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppDashboardComponent,
    AppLoginComponent,
    AppLoginFormComponent
  ],
  imports: [
    BrowserModule,
      NgbModule.forRoot(),
      AppRoutingModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
