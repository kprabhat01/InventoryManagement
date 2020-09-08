import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthenticationResponse } from '../models/authentication';
import { Router } from '@angular/router';
import { CommonService } from '../api/common.service';
import { NotificationService } from '../shared/notification.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private menu: MenuController,
    private local: LocalStorageService,
    private route: Router,
    private notification: NotificationService,
    private commonSerive: CommonService) { }

  username: string;
  role: string;
  userId: number;
  userNotificationCount: number;

  async ngOnInit() {
    await this.local.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.username = p.UserName;
      this.role = p.Role;
      this.userId = p.userid;
      this.getNotification();
    });
    this.commonSerive.importCommonCatch();
  }
  resetSession() {
    this.local.clear().then(() => {
      this.route.navigate(['/login']);
    });
  }
  moveToHome() {
    this.route.navigate(['/home/dashboard']);
  }
  moveToChangePassword() {
    this.route.navigate(['/home/changePassowrd']);
  }
  moveToAddItems() {
    this.route.navigate(['/home/additem']);
  }
  moveToOutletStock() {
    this.route.navigate(['/home/additem/outletStock']);
  }
  moveToNotification() {
    this.route.navigate(['/home/dashboard/notification']);
  }

  getNotification() {
    setInterval(() => {
      this.notification.getNotification(this.userId).subscribe(p => {
        this.local.setObject('userNotification', p);
        this.userNotificationCount = (p as any[]).length;
      }, err => {
        this.userNotificationCount = 0;
        this.local.remove('userNotification');
      }

      );
    }, 360000);
  }
}
