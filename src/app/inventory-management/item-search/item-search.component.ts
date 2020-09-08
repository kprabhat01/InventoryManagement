import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
})
export class ItemSearchComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private local: LocalStorageService
  ) { }

  items: any;

  ngOnInit() {
    this.local.getObject('Items').then(p => {
      this.items = p;
    });
  }

  closePop(item: any) {
    this.modal.dismiss({
      selectedItem: item
    });
  }
}
