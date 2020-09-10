import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss'],
})
export class ReportDashboardComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() { }

  moveToReport(url: string) {
    this.route.navigate([url]);
  }
}
