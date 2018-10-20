import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-login-form.component.html',
  styleUrls: ['./app-login-form.component.css']
})
export class AppLoginFormComponent implements OnInit {

  @Input() type: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  handleSubmitClick(event) {
    event.preventDefault();

    const username = event.target.querySelector('#username').value;
    const password = event.target.querySelector('#password').value;
    console.log(username, password);
    switch (this.type) {
        case "Einloggen":
          this.auth.login(username, password)
          break;
        case "Registrieren":
          break;
    }
  }
}
