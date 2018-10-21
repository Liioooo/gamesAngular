import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-login-form.component.html',
  styleUrls: ['./app-login-form.component.css']
})
export class AppLoginFormComponent implements OnInit {

  @Input() type: string;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  handleSubmitClick(event) {
    event.preventDefault();

    const username = event.target.querySelector('#username').value;
    const password = event.target.querySelector('#password').value;
    switch (this.type) {
        case 'Einloggen':
            this.auth.login(username, password);
          break;
        case 'Registrieren':
            this.auth.register(username, password);
          break;
    }
  }
}
