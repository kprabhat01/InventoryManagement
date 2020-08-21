import { Component, Input, OnChanges } from '@angular/core';
import { InventoryService } from 'src/app/api/inventory.service';

@Component({
  selector: 'app-outlet-stock-list',
  templateUrl: './outlet-stock-list.component.html',
  styleUrls: ['./outlet-stock-list.component.scss'],
})
export class OutletStockListComponent implements OnChanges {

  constructor(
    private item: InventoryService
  ) { }
  @Input() outletId: number;
  currentStocks: any;
  ngOnChanges() {
    this.item.getCurrentOutletStock(this.outletId).subscribe(p => {
      this.currentStocks = p;
    });
  }

}
