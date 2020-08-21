import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private http: HttpClient) { }

  httpGet<T>(api: string): Observable<T> {
    return this.http.get<T>(environment.apiEndPoint + api);
  }

  httpGetParams<T>(api: string, data: any): Observable<T> {
    return this.http.get<T>(environment.apiEndPoint + api, { params: data });
  } 

  httpPostParams<T>(api: string, data: any): Observable<T> {
    return this.http.post<T>(environment.apiEndPoint + api, data);
  }
  httpPostParamsWithHeader<T>(api: string, data: any, contentType: any): Observable<T> {
    return this.http.post<T>(environment.apiEndPoint + api, data, { headers: contentType });
  }
}
