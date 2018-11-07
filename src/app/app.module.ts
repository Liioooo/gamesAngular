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
import {RegisterFormComponent} from './register-form/register-form.component';
import { AppManageAccountComponent } from './app-manage-account/app-manage-account.component';
import { AppFallingBlocksComponent } from './app-falling-blocks/app-falling-blocks.component';
import { AppTictactoeComponent } from './app-tictactoe/app-tictactoe.component';
import { FlappyBirdComponent } from './flappy-bird/flappy-bird.component';
import { Connect4Component } from './connect4/connect4.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppDashboardComponent,
    AppLoginComponent,
    AppLoginFormComponent,
    AppManageAccountComponent,
    AppFallingBlocksComponent,
    AppTictactoeComponent,
    FlappyBirdComponent,
    Connect4Component,
    PageNotFoundComponent,
    HighscoresComponent,
    ScoreListComponent,
      RegisterFormComponent
  ],
  imports: [
    BrowserModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      AppRoutingModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
