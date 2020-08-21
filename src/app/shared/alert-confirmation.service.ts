import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertConfirmationService {

  constructor(private alert: AlertController) { }

  async presentAlert(messagePOP: string) {
    return new Promise(async (resolve) => {
      const alertPopUp = await this.alert.create({
        header: 'Alert',
        message: messagePOP,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: 'Ok',
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alertPopUp.present();
    });
  }
}
