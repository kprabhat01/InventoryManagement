import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Normalize } from 'src/app/models/normalize';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { InventoryService } from 'src/app/api/inventory.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private inventory: InventoryService) { }
  units: Normalize;
  itemForm = this.formBuilder.group({
    name: ['', Validators.required],
    unitId: ['', Validators.required],
    comment: ['', Validators.required],
    createdBy: ['', Validators.required],
    isVarience: ['', Validators.required]
  });

  ngOnInit() {
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.itemForm.patchValue({
        createdBy: p.UserName
      });
    });
    this.localStorage.getObject<Normalize>('Units').then(p => this.units = p);
  }
  onFormSubmission() {
    this.inventory.saveItem(this.itemForm.value);
  }
  getSelectedInput(event){
    console.log(event);
  }
}
