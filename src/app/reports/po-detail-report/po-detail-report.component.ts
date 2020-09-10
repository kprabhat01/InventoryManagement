import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/api/report.service';
import { ModalController } from '@ionic/angular';
import { PoItemDetailComponent } from '../po-item-detail/po-item-detail.component';

@Component({
  selector: 'app-po-detail-report',
  templateUrl: './po-detail-report.component.html',
  styleUrls: ['./po-detail-report.component.scss'],
})
export class PoDetailReportComponent implements OnInit {

  constructor(
    private report: ReportService,
    private modal: ModalController) { }
  poDetails: any;
  ngOnInit() { }

  showReport(data) {
    this.report.getPODetail(data).subscribe(p => {
      this.poDetails = p;
      console.log(p);
    }, err => this.poDetails = []);
  }

  async showItemDetailReport(itemDetail, total) {
    const modelPage = await this.modal.create({
      component: PoItemDetailComponent,
      componentProps: {
        items: itemDetail,
        totalAmount: total
      }
    });

    /*modelPage.onDidDismiss().then(data => {
      if (data.data.dismissed === true) {
        this.getItems();
        this.orderedItem = [];
      }
    });*/
    modelPage.present();
  }

}
