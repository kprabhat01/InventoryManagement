import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { UserManagerService } from 'src/app/api/user-manager.service';
import { ResetCredentials } from '../../models/authentication';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-credential',
  templateUrl: './reset-credential.component.html',
  styleUrls: ['./reset-credential.component.scss'],
})
export class ResetCredentialComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService,
    private user: UserManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  id: number;
  /*resetCredential = this.formBuilder.group({
    passcode: ['', Validators.required],
    rePasscode: ['', Validators.required]
  });*/
  resetCredential = this.formBuilder.group({
    passcode: ['', Validators.required],
    rePasscode: ['', Validators.required]
  });

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.id = +p['id'];
    });
  }

  onFormSubmission() {
    if (this.resetCredential.get('passcode').value !== this.resetCredential.get('rePasscode').value) {
      this.toastMessage.showSweetMesage('Passowrd doesnot match with confirm password', 'danger');
      return;
    } else {
      if (this.id > 0) {
        const obj: ResetCredentials = {
          userId: this.id,
          Password: this.resetCredential.get('passcode').value
        };
        this.user.resetPassword(obj);
      }
    }
  }
}
