import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { HttpRequestService } from './http-request.service';
import { Normalize } from '../models/normalize';
import { Items } from '../models/inventory';
import { AuthenticationResponse } from '../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private localStorage: LocalStorageService, private httpService: HttpRequestService) { }

  importCommonCatch() {
    this.httpService.httpGet<Normalize>('api/getOutlet').subscribe(p => this.localStorage.setObject('Outlets', p));

    this.httpService.httpGet<Normalize>('api/getUserRoles').subscribe(p => this.localStorage.setObject('Roles', p));

    this.httpService.httpGet<Normalize>('api/getUnits').subscribe(p => this.localStorage.setObject('Units', p));

    this.httpService.httpGet<Normalize>('api/getStatus').subscribe(p => this.localStorage.setObject('Status', p));

    this.httpService.httpGet<Normalize>('api/getMovementType').subscribe(p => this.localStorage.setObject('MovementType', p));

    this.getItems();
    this.getUserOutlet();
  }

  getItems() {
    this.httpService.httpGet<Items>('api/getItems').subscribe(p => {
      this.localStorage.setObject('Items', p);
    });
  }
  getUserOutlet() {
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.httpService.httpGet<Normalize>('api/getUserSpecificOutlet/' + p.userid).subscribe(outlet => {
        this.localStorage.setObject('UserOutlet', outlet);
      });
    });
  }
}
