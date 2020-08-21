import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { InventoryService } from 'src/app/api/inventory.service';
import { AlertMessage } from 'src/app/models/globle-veriable';

@Component({
  selector: 'app-outward-item',
  templateUrl: './outward-item.component.html',
  styleUrls: ['./outward-item.component.scss'],
})
export class OutwardItemComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private toast: ToastMessageService,
    private inventory: InventoryService
  ) { }

  @Input() outwardItem: any = [];
  @Input() isInward: any;
  @Input() userName: string;

  ngOnInit() {
    console.log(this.outwardItem);
    console.log(this.isInward);
  }

  closePop(isDismissed: boolean) {
    this.modal.dismiss({
      dismissed: isDismissed,
      outwardItems: this.outwardItem
    });
  }
  deleteItem(item) {
    this.outwardItem.splice(item, 1);
    this.toast.showSweetMesage('Item Deleted', 'danger');
  }
  submitMaterial() {
    let ItemResult = [];
    for (let i = 0; i < this.outwardItem.length; i++) {
      ItemResult.push({
        itemId: this.outwardItem[i].Item.ItemId,
        outletId: this.outwardItem[i].Outlet.Id,
        movementId: this.outwardItem[i].Movement.Id,
        userName: this.userName,
        quantity: this.outwardItem[i].Quantity,
        comment: this.outwardItem[i].Comment,
        rate: this.outwardItem[i].Rate
      });
    }
    this.inventory.saveMaterialRecord(ItemResult, this.isInward).subscribe(p => {
      if (p) {
        this.toast.showSweetMesage(AlertMessage.SuccessfullAlert, 'success');
        this.outwardItem = [];
        this.closePop(true);
      }
    });
  }

}
