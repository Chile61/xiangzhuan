import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberCenterPlatformWechatPage } from '../member-center-platform-wechat/member.center.platform.wechat';
import { MemberCenterPlatformWeiboPage } from '../member-center-platform-weibo/member.center.platform.weibo';
import { MemberCenterPlatformToutiaoPage } from '../member-center-platform-toutiao/member.center.platform.toutiao';

@Component({
  selector: 'Page-MemberCenterPlatform',
  templateUrl: 'member.center.platform.html'
})
export class MemberCenterPlatformPage {


  constructor(public navCtrl: NavController) {

  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  webchatFriendGo(){
    this.navCtrl.push(MemberCenterPlatformWechatPage);
  }

  weiboFansGo(){
    this.navCtrl.push(MemberCenterPlatformWeiboPage);
  }

  toutiaoFansGo(){
    this.navCtrl.push(MemberCenterPlatformToutiaoPage);
  }


}
