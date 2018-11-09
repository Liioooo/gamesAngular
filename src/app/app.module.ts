import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent} from './register-form/register-form.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { FallingBlocksComponent } from './falling-blocks/falling-blocks.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { FlappyBirdComponent } from './flappy-bird/flappy-bird.component';
import { Connect4Component } from './connect4/connect4.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ReactiveFormsModule} from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    LoginFormComponent,
    ManageAccountComponent,
    FallingBlocksComponent,
    TictactoeComponent,
    FlappyBirdComponent,
    Connect4Component,
    PageNotFoundComponent,
    HighscoresComponent,
    ScoreListComponent,
      RegisterFormComponent,
      UserDetailComponent,
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
