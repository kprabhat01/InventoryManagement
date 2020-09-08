import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditPoComponent } from '../edit-po/edit-po.component';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { AlertConfirmationService } from 'src/app/shared/alert-confirmation.service';
import { poComplete } from 'src/app/models/inventory';
import { PoServiceService } from 'src/app/api/po-service.service';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { AlertMessage } from 'src/app/models/globle-veriable';
import { PoItemAcceptanceComponent } from '../po-item-acceptance/po-item-acceptance.component';


@Component({
  selector: 'app-po-management',
  templateUrl: './po-management.component.html',
  styleUrls: ['./po-management.component.scss'],
})
export class PoManagementComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private localStorage: LocalStorageService,
    private alert: AlertConfirmationService,
    private poService: PoServiceService,
    private toast: ToastMessageService
  ) { }
  @Input() poList: any;
  @Output() poEvent: EventEmitter<string> = new EventEmitter();
  userRole: string;
  username: string;
  ngOnInit() {
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.userRole = p.Role;
      this.username = p.UserName;
    });
  }

  poEdit(obj: any) {
    this.getOrderedItems(obj, false);
  }

  viewPO(obj: any) {
    this.getOrderedItems(obj, true);
  }

  async getOrderedItems(obj: any, isOnlyView: boolean) {
    const modelPage = await this.modal.create({
      component: EditPoComponent,
      componentProps: {
        poItems: obj,
        isView: isOnlyView
      }
    });
    modelPage.onDidDismiss().then(data => {
      if (data.data.dismissed === true) {
        this.poEvent.emit("Refresh");
      }
    });
    modelPage.present();
  }
  async importItem(po: any) {
    const modelPage = await this.modal.create({
      component: PoItemAcceptanceComponent,
      componentProps: {
        poItem: po
      }
    });
    modelPage.onDidDismiss().then(() => {
      this.poEvent.emit('Refresh');
    });
    modelPage.present();

    /*this.alert.presentAlert('Do you wanted to import the item to the store inventory? Once Imported the changes will not revert back!')
      .then(p => {
        if (p === 'ok') {
          const obj: poComplete = {
            fromOutletId: po.FromStore.Id,
            toOutletId: po.ToStore.Id,
            username: this.username,
            prId: po.Id
          };
          this.poService.processCompletePORequest(obj).subscribe(p => {
            if (p) {
              this.poEvent.emit('Refresh');
              this.toast.showSweetMesage(AlertMessage.SuccessfullAlert, 'success');
            }
          });
        }
      });*/
  }
}

