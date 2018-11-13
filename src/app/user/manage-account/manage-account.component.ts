import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator, PasswordValidator, UsernameValidator} from '../../helpers/FormValidators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteUserModalComponent} from '../delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  public changePasswordForm: FormGroup;
  public changeUsernameForm: FormGroup;
  public changePictureForm: FormGroup;
  public changeDescriptionForm: FormGroup;

  public changePasswordSubmitted = false;
  public changeUsernameSubmitted = false;
  public changePictureSubmitted = false;

  public changePasswordSuccess = false;
  public changeUsernameSuccess = false;
  public changeDescriptionSuccess = false;

  private file: any;

  constructor(public auth: AuthService, private modalService: NgbModal) {
  }

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

      this.changeDescriptionForm = new FormGroup({
          description: new FormControl('')
      });

      this.auth.getUserDescription().subscribe(data => {
          this.changeDescriptionForm.controls.description.setValue(data['description']);
      });
  }

  get usernameForm() { return this.changeUsernameForm.controls; }

  get passwordForm() { return this.changePasswordForm.controls; }

  get pictureForm() { return this.changePictureForm.controls; }

  get filePath() { return this.changePictureForm.controls.fileInput.value.replace(/\\$/,'').split('\\').pop(); }

  handleLogoutClick() {
    this.auth.logout();
  }

  openDeleteAccountModal() {
      const modal = this.modalService.open(DeleteUserModalComponent);
      modal.componentInstance.accountToDelete = this.auth.getUsername();
      modal.result.then(result => {
          //TODO: delete user account
      }).catch(error => {});
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
            this.changeUsernameForm.controls.newUsername.setErrors({isNotAvailable: true});
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
              this.changePasswordForm.controls.oldPassword.setErrors({invalidPW: true});
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
      if(this.changePictureForm.invalid || this.file === undefined) {
          return;
      }

      this.resize(this.file, 400, 400).then(fileToUpload => {
          this.auth.changePicture(fileToUpload).then(result => {
              if(result == '0') {
                  this.changePictureSubmitted = false;
                  this.auth.updateProfilePicturePath();
              } else {
                  this.changePictureForm.controls.fileInput.setErrors({invalidFile: true})
              }
          });
      });
  }

    removePicture() {
        this.auth.removePicture();
    }

    handleChangeDescriptionClick() {
      this.auth.updateUserDescription(this.changeDescriptionForm.controls.description.value)
          .then(result => {
              this.changeDescriptionSuccess = true;
          });
    }

    resize(base64, maxWidth, maxHeight): Promise<string> {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        let img = new Image();
        img.src = base64;

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        return new Promise<string>(resolve => {
            img.onload = () => {
                ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
                resolve(canvas.toDataURL());
            };
        });
    }

}
