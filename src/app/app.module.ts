import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { RegisterFormComponent} from './user/register-form/register-form.component';
import { ManageAccountComponent } from './user/manage-account/manage-account.component';
import { FallingBlocksComponent } from './games/falling-blocks/falling-blocks.component';
import { TictactoeComponent } from './games/tictactoe/tictactoe.component';
import { FlappyBirdComponent } from './games/flappy-bird/flappy-bird.component';
import { Connect4Component } from './games/connect4/connect4.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HighscoresComponent } from './scores/highscores/highscores.component';
import { ScoreListComponent } from './scores/score-list/score-list.component';
import { ReactiveFormsModule} from '@angular/forms';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { DeleteUserModalComponent } from './user/delete-user-modal/delete-user-modal.component';

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
      DeleteUserModalComponent
    ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      AppRoutingModule,
      HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [DeleteUserModalComponent]
})
export class AppModule { }
