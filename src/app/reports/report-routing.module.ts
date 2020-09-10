import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { SnapshotReportComponent } from './snapshot-report/snapshot-report.component';
import { PoDetailReportComponent } from './po-detail-report/po-detail-report.component';

const routes: Routes = [
    {
        path: '',
        component: ReportDashboardComponent,
    },
    {
        path: 'snapshot',
        component: SnapshotReportComponent
    },
    {
        path: 'poDetailReport',
        component: PoDetailReportComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
