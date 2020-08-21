import { Component, OnInit } from '@angular/core';
import { Normalize } from 'src/app/models/normalize';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { ToastMessageService } from 'src/app/shared/toast-message.service';
import { ModalController } from '@ionic/angular';
import { OutwardItemComponent } from '../outward-item/outward-item.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material-outwards',
  templateUrl: './material-outwards.component.html',
  styleUrls: ['./material-outwards.component.scss'],
})
export class MaterialOutwardsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private toast: ToastMessageService,
    private modal: ModalController,
    private route: ActivatedRoute

  ) { }
  userOutlet: Normalize;
  items: any;
  movementType: Normalize[];
  itemUnit: string = '';
  selectedProduct: any[] = [];
  isInward: boolean = false;
  userName: string;

  outageForm = this.formBuilder.group({
    Outlet: ['', Validators.required],
    Item: ['', Validators.required],
    Movement: ['', Validators.required],
    Quantity: ['', { validators: [Validators.required, Validators.min(1)] }],
    Comment: [''],
    Rate: [0, [Validators.required]]
  });
  ngOnInit() {
    this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => {
      this.userName = p.UserName;
      if (p.Role === 'Super-Admin') {
        this.localStorage.getObject<Normalize>('Outlets').then(p => this.userOutlet = p);
      }
      else {
        this.localStorage.getObject<Normalize>('UserOutlet').then(p => {
          this.userOutlet = p;
        });
      }
      this.route.params.subscribe(params => {
        if (params['isInward'] === 'true') { this.isInward = true; }
      });
    });

    this.localStorage.getObject('Items').then(p => this.items = p);
    this.localStorage.getObject<Normalize[]>('MovementType').then(p =>
      this.movementType = p
    ).finally(() => {
      this.movementType = this.movementType.filter(obj => {
        if (this.isInward) {
          return obj.Id === 1;
        } else {
          return obj.Id === 2 || obj.Id === 3;
        }
      });
    });
  }
  addToOutage() {
    this.toast.showSweetMesage('An Item has been added', 'success');
    this.selectedProduct.push(this.outageForm.value);
  }
  onChange($event) {
    this.itemUnit = $event.target.value.Units.NormalizeName;
  }

  async getOrderedItems() {
    const modelPage = await this.modal.create({
      component: OutwardItemComponent,
      componentProps: {
        outwardItem: this.selectedProduct,
        isInward: this.isInward,
        userName: this.userName
      }
    });
    modelPage.onDidDismiss().then(data => {
      if (data.data.dismissed === true) {
        this.selectedProduct = [];
        this.outageForm.reset();
      } else {
        this.selectedProduct = data.data.outwardItems;
      }
    });
    modelPage.present();
  }

}
