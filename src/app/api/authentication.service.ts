import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { AuthenticationResponse } from '../models/authentication';
import { Credentials } from '../models/authentication';
import { LocalStorageService } from '../shared/local-storage.service';
import { ToastMessageService } from '../shared/toast-message.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

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
  private headers = {
    headers: new HttpHeaders(
      {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'cache-control': 'no-cache',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'origin, x-requested-with',
      })
  };

  async authenticateUser(obj: Credentials) {
    const body = new URLSearchParams();
    body.set('username', obj.username);
    body.set('password', obj.password);
    body.set('grant_type', 'password');
    await this.httpService.httpPostParamsWithHeader<AuthenticationResponse>('token', body.toString(), this.headers.headers)
      .subscribe(p => {
        if (p) {
          this.tostMessage.showSweetMesage(p.UserName, 'warning');
          this.localStorage.setObject('AuthenticationResponse', p).then(p => {
            this.route.navigate(['/home']);
          });
        }
      },
        err => {
          if (err.status === 400) {
            this.tostMessage.showSweetMesage('Invalid Credential', 'danger');
          } else {
            this.tostMessage.showSweetMesage(err.message, 'danger');
          }
        });
  }
}
