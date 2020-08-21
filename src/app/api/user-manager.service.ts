import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { UserCredentials, ResetCredentials } from '../models/authentication';
import { ToastMessageService } from '../shared/toast-message.service';
import { AlertMessage } from '../models/globle-veriable';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private httpService: HttpRequestService, private toastMessage: ToastMessageService) { }
  changePassword(obj: UserCredentials) {
    this.httpService.httpPostParams('api/updatePassword', obj)
      .subscribe(p => {
        if (p) {
          this.toastMessage.showSweetMesage(AlertMessage.SuccessfullAlert, 'success');
        }
      });
  }
  getUers(): Observable<User> {
    return this.httpService.httpGet<User>('api/getUsers');
  }
  resetPassword(obj: ResetCredentials) {
    this.httpService.httpPostParams('api/ChangeCredential', obj)
      .subscribe(p => {
        this.toastMessage.showSweetMesage(AlertMessage.SuccessfullAlert, 'success');
      });
  }
  deleteUser(id: number) {
    return this.httpService.httpPostParams('api/deleteUser/' + id, null);
  }
  createNewUser(obj: object) {
    this.httpService.httpPostParams('api/createUser', obj).subscribe(
      p => this.toastMessage.showSweetMesage(AlertMessage.SuccessfullAlert, 'success')
    );
  }
}
