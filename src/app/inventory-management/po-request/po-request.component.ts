import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Items, orderedItem, currentOutletStock } from 'src/app/models/inventory';
import { ModalController } from '@ionic/angular';
import { PoFinalizerComponent } from '../po-finalizer/po-finalizer.component';
import { InventoryService } from 'src/app/api/inventory.service';
import { filter, map } from 'rxjs/operators';
import { ToastMessageService } from 'src/app/shared/toast-message.service';

@Component({
  selector: 'app-po-request',
  templateUrl: './po-request.component.html',
  styleUrls: ['./po-request.component.scss'],
})
export class PoRequestComponent implements OnInit {

  constructor(
    private local: LocalStorageService,
    private modal: ModalController,
    private inventory: InventoryService,
    private toastMessage: ToastMessageService
  ) {
    this.selectedStore = 0;
  }
  itemValue = 0;
  items: any;
  selectedStore: number;
  orderedItem: orderedItem[] = [];
  notificationItem: any[] = [];

  ngOnInit() {
    this.selectedStore = 0;
  }

  getItems() {
    this.inventory.getCurrentOutletStock(this.selectedStore)
      .subscribe(p => this.items = p);
  }
  getSelectStore(data) {
    this.selectedStore = data;
    this.getItems();
  }
  setValue(e, item, value) {
    this.orderedItem.push({
      lineItem: item,
      qty: value
    });
    this.toastMessage.showSweetMesage('Item has been added to cart', 'success');
  }

  setNotification(obj, item) {
    obj.target.disabled = true;
    this.notificationItem.push(item);
  }

  async getOrderedItems() {
    const modelPage = await this.modal.create({
      component: PoFinalizerComponent,
      componentProps: {
        items: this.orderedItem,
        notifiedItem: this.notificationItem,
        toInventory: this.selectedStore
      }
    });

    modelPage.onDidDismiss().then(data => {
      if (data.data.dismissed === true) {
        this.getItems();
        this.orderedItem = [];
      }
    });
    modelPage.present();
  }
}
