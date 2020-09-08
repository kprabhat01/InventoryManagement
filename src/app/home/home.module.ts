import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UserManagementModule } from '../User/user-management.module';
import { InventoryPageModule } from '../inventory-management/inventory.module';
import { ReportModule } from '../reports/report.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DashboardModule,
    UserManagementModule,
    InventoryPageModule,
    ReportModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
