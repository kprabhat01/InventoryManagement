import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Normalize } from 'src/app/models/normalize';
import { AuthenticationResponse } from 'src/app/models/authentication';



@Component({
  selector: 'app-outlet-filter',
  templateUrl: './outlet-filter.component.html',
  styleUrls: ['./outlet-filter.component.scss'],
})
export class OutletFilterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService
  ) { }
  @Input() isPOSelect: boolean = false;
  @Output() selectedOutlet: EventEmitter<number> = new EventEmitter<number>();
  userOutlet: Normalize;
  OutletSearch = this.formBuilder.group({
    OutletId: ['', Validators.required]
  });

  ngOnInit() {
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      if (p.Role === 'Super-Admin' || this.isPOSelect) {
        this.localStorage.getObject<Normalize>('Outlets').then(p => this.userOutlet = p);
      }
      else {
        this.localStorage.getObject<Normalize>('UserOutlet').then(p => this.userOutlet = p);
      }
    });
  }

  RenderOutlet() {
    this.selectedOutlet.emit(this.OutletSearch.get('OutletId').value);
  }

}
