import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { AuthenticationResponse } from '../models/authentication';
import { Credentials } from '../models/authentication';
import { LocalStorageService } from '../shared/local-storage.service';
import { ToastMessageService } from '../shared/toast-message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpService: HttpRequestService,
    private localStorage: LocalStorageService,
    private tostMessage: ToastMessageService,
    private route: Router
  ) {
    this.localStorage.clear();
  }
  private headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded' });

  async authenticateUser(obj: Credentials) {
    const body = new URLSearchParams();
    body.set('username', obj.username);
    body.set('password', obj.password);
    body.set('grant_type', 'password');
    await this.httpService.httpPostParamsWithHeader<AuthenticationResponse>('token', body.toString(), this.headers)
      .subscribe(p => {
        if (p) {
          this.localStorage.setObject('AuthenticationResponse', p).then(p => {
            this.route.navigate(['/home']);
          });
        }
      },
        err => {
          if (err.status === 400) {
            this.tostMessage.showSweetMesage('Invalid Credential', 'danger');
          } else {
            this.tostMessage.showSweetMesage('Server Error', 'danger');
          }
        });
  }
}
