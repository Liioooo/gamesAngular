import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator, PasswordValidator, UsernameValidator} from '../../helpers/FormValidators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteUserModalComponent} from '../delete-user-modal/delete-user-modal.component';
import {Title} from '@angular/platform-browser';

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

  constructor(public api: ApiService, private modalService: NgbModal, private title: Title) {
  }

  ngOnInit() {
      this.title.setTitle('LioGames - Manage Account');
      this.changeUsernameForm = new FormGroup({
          newUsername: new FormControl('', [Validators.required, Validators.minLength(3)], new UsernameValidator(this.api).usernameAvailable)
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

      this.api.getUserDescription().subscribe(data => {
          this.changeDescriptionForm.controls.description.setValue(data['description']);
      });
  }

  get usernameForm() { return this.changeUsernameForm.controls; }

  get passwordForm() { return this.changePasswordForm.controls; }

  get pictureForm() { return this.changePictureForm.controls; }

  get filePath() { return this.changePictureForm.controls.fileInput.value.replace(/\\$/,'').split('\\').pop(); }

  handleLogoutClick() {
    this.api.logout();
  }

  openDeleteAccountModal() {
      const modal = this.modalService.open(DeleteUserModalComponent);
      modal.componentInstance.accountToDelete = this.api.getUsername();
}


  handleChangeUsernameClick() {
      this.changeUsernameSubmitted = true;

      if(this.changeUsernameForm.invalid) {
          this.changeUsernameSuccess = false;
          return;
      }

      const username = this.changeUsernameForm.controls.newUsername.value;

      this.api.changeUsername(username).subscribe(result => {
        if(result === '') {
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

      this.api.changePassword(newPassword, oldPassword).subscribe(result => {
          if(result === '') {
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
          this.api.changePicture(fileToUpload).subscribe(result => {
              if(result == '') {
                  this.changePictureSubmitted = false;
                  this.api.updateProfilePicturePath();
              } else {
                  this.changePictureForm.controls.fileInput.setErrors({invalidFile: true})
              }
          });
      });
  }

    removePicture() {
        this.api.removePicture();
    }

    handleChangeDescriptionClick() {
      this.api.updateUserDescription(this.changeDescriptionForm.controls.description.value)
          .subscribe(result => {
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
