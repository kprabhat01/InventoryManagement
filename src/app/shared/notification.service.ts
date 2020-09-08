import { Injectable } from '@angular/core';
import { HttpRequestService } from '../api/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpRequestService) {
  }
  getNotification(userId: number) {
    return this.http.httpGet('api/getNotificationBasedOnUserId/' + userId);
  }
  markNotificationToView(userId: number) {
    this.http.httpPostParams('api/updateNotification/' + userId, {}).subscribe(p => {
      if (p) { return true; }
    });
  }
}





