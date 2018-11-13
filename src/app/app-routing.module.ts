import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './user/login/login.component';
import {ManageAccountComponent} from './user/manage-account/manage-account.component';
import {FallingBlocksComponent} from './games/falling-blocks/falling-blocks.component';
import {TictactoeComponent} from './games/tictactoe/tictactoe.component';
import {AuthGuardService} from './auth-guard.service';
import {FlappyBirdComponent} from './games/flappy-bird/flappy-bird.component';
import {Connect4Component} from './games/connect4/connect4.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HighscoresComponent} from './scores/highscores/highscores.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent},
    { path: 'manage-account', component: ManageAccountComponent, canActivate: [AuthGuardService] },
    { path: 'falling-blocks', component: FallingBlocksComponent },
    { path: 'tictactoe', component: TictactoeComponent },
    { path: 'flappy-bird', component: FlappyBirdComponent },
    { path: 'connect-4', component: Connect4Component },
    { path: 'highscores', component: HighscoresComponent },
    { path: 'users/:username', component: UserDetailComponent },
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
