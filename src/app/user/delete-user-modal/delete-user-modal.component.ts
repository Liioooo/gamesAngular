import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {

  @Input() accountToDelete;

  public deleteAccountPasswordForm: FormGroup;
  public deleteAccountPasswordFormSubmitted = false;

  constructor(public activeModal: NgbActiveModal, private auth: AuthService) { }

  get form() { return this.deleteAccountPasswordForm.controls; }

  ngOnInit() {
    this.deleteAccountPasswordForm = new FormGroup({
        deleteAccountPassword: new FormControl('', Validators.required)
    });
  }

    deleteAccount() {
      this.deleteAccountPasswordFormSubmitted = true;
      if(this.deleteAccountPasswordForm.invalid) return;

      this.auth.deleteUserAccount(this.deleteAccountPasswordForm.controls.deleteAccountPassword.value).then(result => {
        if(result !== '0') {
            this.deleteAccountPasswordForm.controls.deleteAccountPassword.setErrors({invalidPW: true});
        } else {
            this.activeModal.close('deleted');
        }
      });
    }

}
