
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { SnapshotReportComponent } from './snapshot-report/snapshot-report.component';
import { PoDetailReportComponent } from './po-detail-report/po-detail-report.component';
import { PoItemDetailComponent } from './po-item-detail/po-item-detail.component';
import { MovementSearchPipe } from '../pipes/search/movement-search.pipe';




@NgModule({
  declarations: [
    ReportDashboardComponent,
    ReportFilterComponent,
    SnapshotReportComponent,
    PoDetailReportComponent,
     PoItemDetailComponent,
     MovementSearchPipe
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReportModule { }
