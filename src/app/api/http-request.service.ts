import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private http: HttpClient, private pt: Platform, private httpNative: HTTP) { }

  httpGet<T>(api: string): Observable<T> {

    return this.http.get<T>(environment.apiEndPoint + api);

  }

  httpGetParams<T>(api: string, data: any): Observable<T> {

    return this.http.get<T>(environment.apiEndPoint + api, { params: data });

  }

  httpPostParams<T>(api: string, data: any): Observable<T> {

    return this.http.post<T>(environment.apiEndPoint + api, data);

  }

  httpPostParamsWithHeader<T>(api: string, data: any, contentType: HttpHeaders): Observable<T> { 
    return this.http.post<T>(environment.apiEndPoint + api, data, { headers: contentType });
  }
}
