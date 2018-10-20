import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AppDashboardComponent} from './app-dashboard/app-dashboard.component';
import {AppLoginComponent} from './app-login/app-login.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AppDashboardComponent },
    { path: 'login', component: AppLoginComponent },
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