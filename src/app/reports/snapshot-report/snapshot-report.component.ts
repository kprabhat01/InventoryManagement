import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/api/report.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-snapshot-report',
  templateUrl: './snapshot-report.component.html',
  styleUrls: ['./snapshot-report.component.scss'],
})
export class SnapshotReportComponent implements OnInit {

  constructor(private report: ReportService) { }

  snapShotReports: any;

  ngOnInit() { }

  showReport(data) {
    this.report.getSnapshot(data).subscribe(p => {
      this.snapShotReports = p;
    }, err => {
      this.snapShotReports = null;
    });
  }

}
