import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthenticationResponse } from '../models/authentication';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router, private localStorage: LocalStorageService) { }
  role: string;

  ngOnInit() {
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.role = p.Role;
    });
  }
  navigatUser() {
    this.route.navigate(['/home/userManagement']);
  }
  navigatePORequest() {
    this.route.navigate(['/home/additem/pologs']);
  }
  navigateToMaterialOutwards() {
    this.route.navigate(['/home/additem/materialOutwards', false]);
  }
  navigateToMaterialInward() {
    this.route.navigate(['/home/additem/materialOutwards', true]);
  }
  navigateToReports() {
    this.route.navigate(['/home/reports']);
  }
}
