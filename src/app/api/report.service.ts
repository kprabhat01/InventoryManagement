import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpRequestService) { }

  getSnapshot(obj: any) {
    return this.http.httpGetParams('api/getSnapshot', obj);
  }

  getPODetail(obj: any) {
    return this.http.httpGetParams('api/getPODetailReport', obj);
  }

}
