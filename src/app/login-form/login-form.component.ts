import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(public auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  handleSubmitClick() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

    // const username = event.target.querySelector('#username').value;
    // const password = event.target.querySelector('#password').value;
    // switch (this.type) {
    //     case 'Einloggen':
    //         this.auth.login(username, password);
    //       break;
    //     case 'Registrieren':
    //         this.auth.register(username, password);
    //       break;
    // }
  }
}
