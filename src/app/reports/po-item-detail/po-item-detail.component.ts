import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-po-item-detail',
  templateUrl: './po-item-detail.component.html',
  styleUrls: ['./po-item-detail.component.scss'],
})
export class PoItemDetailComponent implements OnInit {

  constructor(private modal: ModalController) { }
  @Input() items: any;
  @Input() totalAmount: number;
  ngOnInit() { }

  closePopUp() {
    this.modal.dismiss();
  }

}
