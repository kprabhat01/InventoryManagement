import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { NotificationService } from 'src/app/shared/notification.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss'],
})
export class NotificationAlertComponent implements OnInit {

  constructor(
    private local: LocalStorageService,
    private note: NotificationService
  ) { }
  notifications: any;
  ngOnInit() {
    this.showNotification();
  }
  showNotification() {
    this.local.getObject<any>('userNotification').then(p => {
      this.notifications = p;
      this.hideNotification();
    });
  }

  hideNotification() {
    this.local.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.note.markNotificationToView(p.userid);
    });
  }

}
