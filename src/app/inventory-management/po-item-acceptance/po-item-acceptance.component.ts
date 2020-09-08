import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { AlertConfirmationService } from 'src/app/shared/alert-confirmation.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { PoServiceService } from 'src/app/api/po-service.service';
@Component({
  selector: 'app-po-item-acceptance',
  templateUrl: './po-item-acceptance.component.html',
  styleUrls: ['./po-item-acceptance.component.scss'],
})
export class PoItemAcceptanceComponent implements OnInit {
  formAcceptItem: FormGroup;
  username: string;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private toast: ToastMessageService,
    private alert: AlertConfirmationService,
    private local: LocalStorageService,
    private poService: PoServiceService
  ) {
    this.formAcceptItem = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    });
  }

  @Input() poItem: any;

  ngOnInit() {
    this.local.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => this.username = p.UserName);
  }
  closePop() {
    this.modal.dismiss();
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.formAcceptItem.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submit() {
    console.log(this.poItem);
    this.alert.presentAlert('Do you want to import selected Item').then(res => {
      if (res === 'ok') {
        const selectedElement = {
          fromOutletId: this.poItem.FromStore.Id,
          toOutletId: this.poItem.ToStore.Id,
          prId: this.poItem.Id,
          username: this.username,
          PrItem: []
        };
        this.formAcceptItem.value.checkArray.forEach(element => {
          selectedElement.PrItem.push(element);
        });
        this.poService.processCompletePORequest(selectedElement).subscribe(p => {
          if (p) {
            this.closePop();
          }
        });
      }
    });
  }

}
