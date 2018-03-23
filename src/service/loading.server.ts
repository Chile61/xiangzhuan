/**
 * Created by lichun on 2018/1/11.
 */
import { Injectable} from "@angular/core";
import { LoadingController } from 'ionic-angular';
@Injectable()
export class LoadingServer {

  public loading:any;

  constructor(public loadingCtrl: LoadingController) {

  }

  startLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Loading...'
    });

    this.loading.present();
  }

  endLoading(){
    this.loading.dismiss();
  }


}
