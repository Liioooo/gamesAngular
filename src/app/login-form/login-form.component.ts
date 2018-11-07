import {Component, OnInit} from '@angular/core';
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

  get form() { return this.loginForm.controls; }

  handleSubmitClick() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      const username = this.loginForm.controls.username.value;
      const password = this.loginForm.controls.password.value;
      this.auth.login(username, password).then(result => {
          if(result === 'noSuchUser') {
              this.loginForm.controls.username.setErrors({noSuchUser: true})
          } else if(result === 'invalid') {
              this.loginForm.controls.password.setErrors({invalidPW: true})
          }
      });
  }
}
