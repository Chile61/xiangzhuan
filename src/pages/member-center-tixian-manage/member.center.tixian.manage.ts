import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberCenterTixianAlipayPage } from '../member-center-tixian-alipay/member.center.tixian.alipay';
import { MemberCenterTixianWechatPage } from '../member-center-tixian-wechat/member.center.tixian.wechat';
import { MemberCenterTixianBankPage } from '../member-center-tixian-bank/member.center.tixian.bank';

@Component({
  selector: 'Page-MemberCenterTixianManage',
  templateUrl: 'member.center.tixian.manage.html'
})
export class MemberCenterTixianManagePage {

  constructor(public navCtrl: NavController) {

  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  alipayGo(){
    this.navCtrl.push(MemberCenterTixianAlipayPage);
  }

  webchatGo(){
    this.navCtrl.push(MemberCenterTixianWechatPage);
  }

  bankGo(){
    this.navCtrl.push(MemberCenterTixianBankPage);
  }

}
