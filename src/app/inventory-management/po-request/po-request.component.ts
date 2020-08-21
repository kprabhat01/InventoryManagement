import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { Items, orderedItem } from 'src/app/models/inventory';
import { ModalController } from '@ionic/angular';
import { PoFinalizerComponent } from '../po-finalizer/po-finalizer.component';

@Component({
  selector: 'app-po-request',
  templateUrl: './po-request.component.html',
  styleUrls: ['./po-request.component.scss'],
})
export class PoRequestComponent implements OnInit {

  constructor(
    private local: LocalStorageService,
    private modal: ModalController
  ) { }
  itemValue = 0;

  items: Items;
  orderedItem: orderedItem[] = [];

  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.local.getObject<Items>('Items').then(p => {
      this.items = p;
    });
  }
  setValue(e, item, value) {
    this.orderedItem.push({
      lineItem: item,
      qty: value
    });

  }
  async getOrderedItems() {
    const modelPage = await this.modal.create({
      component: PoFinalizerComponent,
      componentProps: {
        items: this.orderedItem
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
