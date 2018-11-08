import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator, PasswordValidator, UsernameValidator} from '../FormValidators';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  public changePasswordForm: FormGroup;
  public changeUsernameForm: FormGroup;
  public changePictureForm: FormGroup;
  public changePasswordSubmitted = false;
  public changeUsernameSubmitted = false;
  public changePictureSubmitted = false;
  public changePasswordSuccess = false;
  public changeUsernameSuccess = false;

  private file: any;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
      this.changeUsernameForm = new FormGroup({
          newUsername: new FormControl('', [Validators.required, Validators.minLength(3)], new UsernameValidator(this.auth).usernameAvailable)
      });
      this.changePasswordForm = new FormGroup({
          oldPassword: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
          password1: new FormControl('', Validators.required)
      }, {
          validators: PasswordValidator.samePasswords
      });
      this.changePictureForm = new FormGroup({
          fileInput: new FormControl('', [Validators.required, FileValidator.fileValid])
      });
  }

  get usernameForm() { return this.changeUsernameForm.controls; }

  get passwordForm() { return this.changePasswordForm.controls; }

  get pictureForm() { return this.changePictureForm.controls; }

  get filePath() { return this.changePictureForm.controls.fileInput.value.replace(/\\$/,'').split('\\').pop(); }

  handleLogoutClick() {
    this.auth.logout();
  }

  handleChangeUsernameClick() {
      this.changeUsernameSubmitted = true;

      if(this.changeUsernameForm.invalid) {
          this.changeUsernameSuccess = false;
          return;
      }

      const username = this.changeUsernameForm.controls.newUsername.value;

      this.auth.changeUsername(username).then(result => {
        if(result === '0') {
            this.changeUsernameSuccess = true;
            this.changeUsernameSubmitted = false;
            this.changeUsernameForm.reset();
        } else {
            this.changeUsernameForm.controls.newUsername.setErrors({isNotAvailable: true})
            this.changeUsernameSuccess = false;
        }
      });
  }

  handleChangePasswordClick() {
      this.changePasswordSubmitted = true;
      if(this.changePasswordForm.invalid) {
          this.changePasswordSuccess = false;
          return;
      }

      const newPassword = this.changePasswordForm.controls.password.value;
      const oldPassword = this.changePasswordForm.controls.oldPassword.value;

      this.auth.changePassword(newPassword, oldPassword).then(result => {
          if(result === '0') {
              this.changePasswordSuccess = true;
              this.changePasswordSubmitted = false;
              this.changePasswordForm.reset();

          } else {
              this.changePasswordForm.controls.oldPassword.setErrors({invalidPW: true})
              this.changePasswordSuccess = false;
          }
      });
  }

  onFileChange(event) {
      let reader = new FileReader();

      if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
              this.file = reader.result;
          };
      }
  }

  handleChangePictureClick() {
      this.changePictureSubmitted = true;
      if(this.changePictureForm.invalid) {
          return;
      }
      console.log(this.file);

      this.auth.changePicture(this.file).then(result => {
          console.log(result);
      });
  }

}
