import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ToastMessageService } from '../shared/toast-message.service';
import { AlertMessage } from '../models/globle-veriable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoServiceService {

  constructor(private http: HttpRequestService, private tost: ToastMessageService) { }

  savePORequest(obj: any) {
    this.http.httpPostParams('api/savePORequest', obj).subscribe(p => {
      if (p) {
        this.tost.showSweetMesage(AlertMessage.SuccessfullAlert, 'success');
      }
    });
  }


  getPoRequestBasedOnFromOutlet(outletId: number): Observable<any> {
    return this.http.httpGet<any>('api/getPORequestBasedOnFromOutletId/' + outletId);
  }

  getPOForProcess(role: string) {
    return this.http.httpGet<any>('api/getPOResultForProcess');
  }

  processPORequest(obj: any): Observable<any> {
    return this.http.httpPostParams('api/processPORequest', obj);
  }
  processCompletePORequest(obj: any): Observable<any> {
    return this.http.httpPostParams('api/completePORequest', obj);
  }

}

