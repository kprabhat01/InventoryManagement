import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outlet-stock',
  templateUrl: './outlet-stock.component.html',
  styleUrls: ['./outlet-stock.component.scss'],
})
export class OutletStockComponent implements OnInit {

  constructor() { }
  selectedOutlet: number = 0;
  ngOnInit() { }

  getSelectedStore(data) {
    console.log(data);
    this.selectedOutlet = data;
  }

}
