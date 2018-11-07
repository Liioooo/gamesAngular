import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidators} from '../../FormValidators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(public auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(3)]],
          password: ['', Validators.required],
          password1: ['', Validators.required]
      }, {
          validator: FormValidators.samePasswords
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
