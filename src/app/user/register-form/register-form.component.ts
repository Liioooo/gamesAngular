import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {PasswordValidator, UsernameValidator} from '../../helpers/FormValidators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(public api: ApiService, private title: Title) { }

  ngOnInit() {
      this.title.setTitle('LioGames - Register');
      this.loginForm = new FormGroup({
          username: new FormControl('', [Validators.required, Validators.minLength(3)], new UsernameValidator(this.api).usernameAvailable),
          password: new FormControl('', Validators.required),
          password1: new FormControl('', Validators.required),
      }, {
          validators: [PasswordValidator.samePasswords],
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
      this.api.register(username, password).pipe(
          filter(data => data === 'alreadyExists')
      ).subscribe(data => this.loginForm.controls.username.setErrors({isNotAvailable: true}));
  }
}
