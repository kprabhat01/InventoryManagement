import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Normalize } from 'src/app/models/normalize';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/shared/toast-message.service';


@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss'],
})
export class ReportFilterComponent implements OnInit {

  constructor(
    private local: LocalStorageService,
    private form: FormBuilder,
    private toast: ToastMessageService
  ) { }

  outlets: Normalize;

  @Output() reportFilterObj: EventEmitter<any> = new EventEmitter<any>();

  reportFilter = this.form.group({
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    outletId: ['', Validators.required]
  });

  ngOnInit() {
    this.local.getObject<Normalize>('Outlets').then(p => this.outlets = p);
  }

  castSelectedOption() {
    if (Date.parse(this.reportFilter.get('fromDate').value) > Date.parse(this.reportFilter.get('toDate').value)) {
      this.toast.showSweetMesage('From date cannot be greater than To date', 'danger');
      return;
    }
    this.reportFilterObj.emit(this.reportFilter.value);
  }

}
