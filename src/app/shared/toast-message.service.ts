import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private toast: ToastController) {
  }
  async showSweetMesage(contextMessage: string, contextColor: string) {
    const toastMessage = await this.toast.create({
      message: contextMessage,
      duration: 3000,
      color: contextColor
    });
    toastMessage.present();
  }
}

