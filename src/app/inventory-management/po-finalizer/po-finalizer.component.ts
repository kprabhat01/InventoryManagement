import { Component, OnInit, Input } from '@angular/core';
import { orderedItem } from 'src/app/models/inventory';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Normalize } from 'src/app/models/normalize';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { AlertMessage } from 'src/app/models/globle-veriable';
import { PoServiceService } from 'src/app/api/po-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-po-finalizer',
  templateUrl: './po-finalizer.component.html',
  styleUrls: ['./po-finalizer.component.scss'],
})
export class PoFinalizerComponent implements OnInit {

  constructor(
    private local: LocalStorageService,
    private modal: ModalController,
    private form: FormBuilder,
    private toast: ToastMessageService,
    private poService: PoServiceService,
    private route: Router
  ) { }

  @Input() items: orderedItem[] = [];
  @Input() notifiedItem: any[] = [];
  @Input() toInventory: number;

  userOutlet: Normalize;
  releventStore: Normalize;
  userId: number;

  poRequestForm = this.form.group({
    fromOutletId: ['', Validators.required],
    toOutletId: ['', Validators.required],
    poItems: ['', Validators.required],
    createdBy: ['', Validators.required],
    poNotification: ['']
  });

  ngOnInit() {
    this.local.getObject<Normalize>('UserOutlet').then(p => this.userOutlet = p);
    this.local.getObject<Normalize>('Outlets').then(p => this.releventStore = p);
    this.patchItem();
    this.local.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.poRequestForm.patchValue({
        createdBy: p.UserName
      });
      this.userId = p.userid;
    });
  }

  patchItem() {
    this.poRequestForm.patchValue({
      poItems: this.items,
      toOutletId: this.toInventory
    });
  }

  deleteItem(i, z) {
    this.items.splice(i, z);
    this.patchItem();
  }

  closePop(isDismissed: boolean) {
    this.modal.dismiss({
      dismissed: isDismissed
    });
  }

  SubmitForm() {
    if (this.poRequestForm.get('fromOutletId').value === this.poRequestForm.get('toOutletId').value) {
      this.toast.showSweetMesage(AlertMessage.CommonOutletError, 'danger');
    } else {
      const obj: any = [];

      for (const item of this.items) {
        obj.push({
          itemid: item.lineItem.ItemId,
          quantity: item.qty
        });
      }
      let notification = [];

      for (const item of this.notifiedItem) {
        notification.push({
          userid: this.userId,
          itemId: item.ItemId,
          OutletId: this.toInventory
        });
      }
      this.poRequestForm.patchValue({
        poItems: obj,
        poNotification: notification
      });

      this.poService.savePORequest(this.poRequestForm.value);
    }
    this.closePop(true);
  }

}
