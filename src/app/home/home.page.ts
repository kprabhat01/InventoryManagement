import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthenticationResponse } from '../models/authentication';
import { Router } from '@angular/router';
import { CommonService } from '../api/common.service';
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
    private commonSerive: CommonService) { }

  username: string;
  role: string;

  async ngOnInit() {
    await this.local.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.username = p.UserName;
      this.role = p.Role;
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


}
