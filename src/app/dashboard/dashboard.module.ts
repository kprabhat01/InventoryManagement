import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NotificationAlertComponent } from '../notification/notification-alert/notification-alert.component';

@NgModule({
  declarations: [DashboardComponent, NotificationAlertComponent],
  imports: [
    CommonModule,
    IonicModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
