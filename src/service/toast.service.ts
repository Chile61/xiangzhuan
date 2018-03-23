import { Injectable } from "@angular/core";
import { ToastController } from 'ionic-angular';
@Injectable()
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  presentToast(_text:string,positionString: string,_duration:number=3000) {
    let toast = this.toastCtrl.create({
      message: _text,
      duration: _duration,
      showCloseButton: true,
      closeButtonText: '关闭',
      position: positionString
    });

    toast.onDidDismiss(() => {
      console.log('关闭弹出');
    });

    toast.present();
  }
}
