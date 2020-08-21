import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertConfirmationService } from 'src/app/shared/alert-confirmation.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { PoServiceService } from 'src/app/api/po-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.scss'],
})
export class EditPoComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private alert: AlertConfirmationService,
    private localStorage: LocalStorageService,
    private poService: PoServiceService,
    private route: Router
  ) { }
  @Input() poItems: any;
  @Input() isView: boolean;

  items: any[] = [];
  username: string;
  isAuthorized: boolean = true;

  ngOnInit() {
    console.log(this.poItems);
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.username = p.UserName;
      if (p.Role !== 'Inventory-Manager' && p.Role !== 'Super-Admin') {
        this.isAuthorized = false;
      }
    });
  }
  saveEditedList(value: any) {
    for (let i = 0; i < this.poItems.ItemDetail.length; i++) {
      this.items.push({
        ItemId: value['poItem.Id-' + i],
        Quantity: value['poItem.Quantity-' + i],
        Rate: value['poItem.Rate-' + i],
      });
    }
    if (this.items.length >= 1) {
      this.alert.presentAlert('Are you sure to process the PO Request').then(p => {
        if (p === 'ok') {
          const obj = {
            id: this.poItems.Id,
            items: this.items,
            username: this.username
          };
          this.poService.processPORequest(obj).subscribe(s => {
            if (s) {
              this.closePop(true);
            }
          });
          this.route.navigate(['/home/additem/pologs']);
        }
      });
    }
  }
  closePop(isChangeOnDismissed: boolean) {
    this.modal.dismiss({
      dismissed: isChangeOnDismissed
    });
  }

}
