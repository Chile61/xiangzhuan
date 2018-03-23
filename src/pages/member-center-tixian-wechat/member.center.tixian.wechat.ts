import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'Page-MemberCenterTixianWechat',
  templateUrl: 'member.center.tixian.wechat.html'
})
export class MemberCenterTixianWechatPage {

  weChat:string;

  constructor(public navCtrl: NavController,
              private homeService:HomeService,
              private toast:ToastService,
              private gs:GlobalService) {

  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  weChatHandler(){

    let _value ={
      'weChat':this.weChat,
      'invitation':this.gs.get('userInfo')['invitation']
    };
    this.homeService.weChatService(_value).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toast.presentToast('对不起！更新信息失败','bottom');
      }
      if(_code == '1'){
        this.toast.presentToast('恭喜！更新信息成功','bottom');
        this.navCtrl.pop();
      }
    })
  }

}
