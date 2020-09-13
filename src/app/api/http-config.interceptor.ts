import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, EMPTY, from } from 'rxjs';
import { map, catchError, finalize, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthenticationResponse } from '../models/authentication';
import { ToastMessageService } from '../shared/toast-message.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  loaderToShow: any;
  token: string;
  constructor(
    private loadingCtrl: LoadingController,
    private storage: LocalStorageService,
    private toastMessage: ToastMessageService
  ) {

  }

  async getToken() {
    await this.storage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.token = p?.access_token;
    });
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.storage.getObject<AuthenticationResponse>('AuthenticationResponse'))
      .pipe(
        switchMap(token => {
          this.loadspinner();
          if (token) {
            request = request.clone({ headers: request.headers.append('Authorization', 'Bearer ' + token.access_token) });
          }

          if (!request.headers.has('Content-Type')) {
            request = request.clone({
              headers:
                request.headers.append('Content-Type', 'application/json')
                  .append('Access-Control-Allow-Origin', '*')
            });
          }
          
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
              }
              this.hidspinner();
              return event;
            }, finalize(() => this.hidspinner())),
            catchError((error: HttpErrorResponse) => {
              this.toastMessage.showSweetMesage(error.status + '=>' + error.error?.Message, 'danger');
              this.hidspinner();
              return throwError(error);
            }), finalize(() => this.hidspinner())
          );
        })
      );
  }

  loadspinner() {
    this.loadingCtrl.getTop().then(hasLoading => {
      if (!hasLoading) {
        this.loadingCtrl.create({
          spinner: 'circular',
          translucent: true
        }).then(loading => loading.present());
      }
    });
  }

  hidspinner() {
    this.loadingCtrl.getTop().then(hasLoading => {
      if (hasLoading) {
        this.loadingCtrl.dismiss();
      }
    });
  }


}
