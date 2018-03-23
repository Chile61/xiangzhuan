import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'Modal-NickName',
  templateUrl: 'modal.nickname.html'
})
export class NickNameModal {

  private _nickname:string;

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController) {

    this._nickname = params.get('nickName')
  }

  closeNickName(){
    this.viewCtrl.dismiss(null);
  }

  saveNickName(){
    this.viewCtrl.dismiss(this._nickname);
  }

}
