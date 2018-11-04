import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AppDashboardComponent} from './app-dashboard/app-dashboard.component';
import {AppLoginComponent} from './app-login/app-login.component';
import {AppManageAccountComponent} from './app-manage-account/app-manage-account.component';
import {AppFallingBlocksComponent} from './app-falling-blocks/app-falling-blocks.component';
import {AppTictactoeComponent} from './app-tictactoe/app-tictactoe.component';
import {AuthGuardService} from './auth-guard.service';
import {FlappyBirdComponent} from './flappy-bird/flappy-bird.component';
import {Connect4Component} from './connect4/connect4.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HighscoresComponent} from './highscores/highscores.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AppDashboardComponent },
    { path: 'login', component: AppLoginComponent},
    { path: 'manage-account', component: AppManageAccountComponent, canActivate: [AuthGuardService] },
    { path: 'falling-blocks', component: AppFallingBlocksComponent },
    { path: 'tictactoe', component: AppTictactoeComponent },
    { path: 'flappy-bird', component: FlappyBirdComponent },
    { path: '4-gewinnt', component: Connect4Component },
    { path: 'highscores', component: HighscoresComponent },
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
