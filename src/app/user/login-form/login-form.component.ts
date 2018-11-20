import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(public api: ApiService, private formBuilder: FormBuilder, private title: Title) { }

  ngOnInit() {
      this.title.setTitle('LioGames - Login');
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
      this.api.login(username, password).subscribe(result => {
          if(result === 'noSuchUser') {
              this.loginForm.controls.username.setErrors({noSuchUser: true})
          } else if(result === 'invalid') {
              this.loginForm.controls.password.setErrors({invalidPW: true})
          }
      });
  }
}
