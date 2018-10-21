import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './app-manage-account.component.html',
  styleUrls: ['./app-manage-account.component.css']
})
export class AppManageAccountComponent implements OnInit {

  public newPasswordsNotEqual: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.changedUserSuccess = false;
    this.auth.changedPassSuccess = false;
  }

  handleLogoutClick() {
    this.auth.logout();
  }

    handleChangeUsernamerClick(event) {
        event.preventDefault();

        const newUsername = event.target.querySelector('#newUsername').value;
        this.auth.changeUsername(newUsername);
    }

    handleChangePasswordClick(event) {
        event.preventDefault();

        const oldPassword = event.target.querySelector('#oldPassword').value;
        const newPassword1 = event.target.querySelector('#newPassword1').value;
        const newPassword2 = event.target.querySelector('#newPassword2').value;

        if(newPassword1 === newPassword2) {
          this.newPasswordsNotEqual = false;
          this.auth.changePassword(newPassword1, oldPassword);
        } else {
          this.newPasswordsNotEqual = true;
        }
    }
}
