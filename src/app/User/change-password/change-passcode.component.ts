import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { UserManagerService } from 'src/app/api/user-manager.service';
import { UserCredentials, AuthenticationResponse } from '../../models/authentication';
@Component({
  selector: 'app-change-passcode',
  templateUrl: './change-passcode.component.html',
  styleUrls: ['./change-passcode.component.scss'],
})
export class ChangePasscodeComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService,
    private storage: LocalStorageService,
    private userManager: UserManagerService
  ) { }
  authCredential = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    rePassword: ['', Validators.required]
  });

  ngOnInit() { }

  onFormSubmission() {
    if (this.authCredential.get('password').value !== this.authCredential.get('rePassword').value) {
      this.toastMessage.showSweetMesage('Passowrd is not matching', 'danger');
      return;
    } else {
      this.storage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {

        const userObj: UserCredentials = {
          userid: p.userid,
          oldPassword: this.authCredential.get('oldPassword').value,
          newPassword: this.authCredential.get('rePassword').value
        }
        this.userManager.changePassword(userObj);
      });
    }
  }

}
