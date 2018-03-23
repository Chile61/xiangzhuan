import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'Page-MemberCenterCode',
  templateUrl: 'member.center.code.html'
})
export class MemberCenterCodePage {

  private _code:any;

  constructor(public navCtrl: NavController,params: NavParams,) {
    this._code = params.get('_code');
  }


  backLeftGo(){
    this.navCtrl.pop();
  }

}
