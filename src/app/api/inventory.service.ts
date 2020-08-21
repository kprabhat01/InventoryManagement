import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { ToastMessageService } from '../shared/toast-message.service';
import { AlertMessage } from '../models/globle-veriable';
import { CommonService } from './common.service';
import { observable, Observable } from 'rxjs';
import { currentOutletStock } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpRequestService,
    private toastMessage: ToastMessageService,
    private commonService: CommonService) { }

  saveItem(obj: any) {
    this.http.httpPostParams('api/saveItems', obj).subscribe(p => {
      if (p) {
        this.toastMessage.showSweetMesage(AlertMessage.SuccessfullAlert, 'success');
        this.commonService.getItems();
      }
    });
  }

  getCurrentOutletStock(outletId: number) {
    return this.http.httpGet<currentOutletStock>('api/GetCurrentStock/' + outletId);
  }
  saveMaterialRecord(obj: any, isInwrds: boolean): Observable<any> {

    if (isInwrds) {
      return this.http.httpPostParams('api/saveInwardMaterial', obj);
    }
    else {
      return this.http.httpPostParams('api/saveOutwardMaterial', obj);
    }
  }
}
