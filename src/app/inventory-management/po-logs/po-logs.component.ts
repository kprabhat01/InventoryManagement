import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Normalize } from 'src/app/models/normalize';
import { FormBuilder, Validators } from '@angular/forms';
import { PoServiceService } from 'src/app/api/po-service.service';
import { AuthenticationResponse } from 'src/app/models/authentication';

@Component({
  selector: 'app-po-logs',
  templateUrl: './po-logs.component.html',
  styleUrls: ['./po-logs.component.scss'],
})
export class PoLogsComponent implements OnInit {

  constructor(
    private route: Router,
    private localStorage: LocalStorageService,
    private form: FormBuilder,
    private poService: PoServiceService
  ) { }
  userOutlet: Normalize;
  poRequestData: any;
  userRole: string;

  pologs = this.form.group({
    fromOutletId: ['', Validators.required]
  });

  ngOnInit() {
    this.localStorage.getObject<Normalize>('UserOutlet').then(p => this.userOutlet = p);
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.userRole = p.Role;
      if (this.userRole === 'Inventory-Manager' || this.userRole === 'Super-Admin') {
        this.getPORequestToProcess();
      }
    });
  }
  getPORequestToProcess() {
    this.poRequestData = null;
    this.poService.getPOForProcess(this.userRole).subscribe(p => {
      if (p) {
        this.poRequestData = p;
      }
    });
  }

  moveToItems() {
    this.route.navigate(['/home/additem/porequest']);
  }
  searchRequest() {
    if (this.pologs.valid) {
      this.poRequestData = [];
      this.poService.getPoRequestBasedOnFromOutlet(this.pologs.get('fromOutletId').value).subscribe(p => {
        if (p) {
          this.poRequestData = p;
        }
      });
    }
  }
  checkRefresh(event) {
    if (this.userRole === 'Inventory-Manager' || this.userRole === 'Super-Admin') {
      this.getPORequestToProcess();
    } else {
      this.searchRequest();
    }
  }

}
