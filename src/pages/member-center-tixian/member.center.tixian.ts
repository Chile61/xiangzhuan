import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MemberCenterTixianManagePage } from '../member-center-tixian-manage/member.center.tixian.manage';
import { GlobalService } from '../../service/global-service';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'Page-MemberCenterTixian',
  templateUrl: 'member.center.tixian.html'
})
export class MemberCenterTixianPage implements OnInit{

  private wechat:string;
  private alipay:string;
  private banks:string;
  private amountmoney:number;
  private balance:number = 0;
  txMode;

  constructor(public navCtrl: NavController,
              private gs:GlobalService,
              private authService:AuthService,
              private homeService:HomeService,
              private toast:ToastService) {

    this.wechat = this.gs.get('userInfo')['weChat'];
    this.alipay = this.gs.get('userInfo')['alipay'];
    this.banks = this.gs.get('userInfo')['banks'];
    this.balance = this.gs.get('userInfo')['integral'];

    this.txMode = "0";
    //console.log(this.wechat)
    //console.log(this.alipay)
    //console.log(this.banks)

  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  ngOnInit(){

  }

  tixianManage(){
    this.navCtrl.push(MemberCenterTixianManagePage);
  }

  tixianHandler(){
    //console.log(this.txMode);
    let _tixianMode:string = this.showText(this.txMode);
    let _tixianZhh:string = this.showMode(this.txMode);

    if(this.amountmoney<10){
      this.toast.presentToast('提现最低金额为10元','bottom');
    }else if(this.amountmoney>this.balance){
      this.toast.presentToast('提现金额不能大于余额','bottom');
    }else if(this.txMode=''){
      this.toast.presentToast('请选择提现方式','bottom');
    }else{
      let _value = {
        'username':this.gs.get('userInfo')['username'],
        'invitation':this.gs.get('userInfo')['invitation'],
        'amountmoney':this.amountmoney,
        'balance':this.balance,
        'mobile':this.gs.get('userInfo')['mobile'],
        'tixianMode':_tixianMode,
        'tixianZhh':_tixianZhh
      };

      console.log(_value)

      this.homeService.tixianService(_value).then((res) => {
        let _code = res['code'];
        if(_code == '0'){
          this.toast.presentToast('对不起！提交失败','bottom');
        }
        if(_code == '1'){
          this.toast.presentToast('恭喜！提交成功','bottom');
          this.authService.getUserInfo(this.gs.get('username'));
          this.navCtrl.pop();
        }
      });
    }
  }

  showMode(_txMode){

    let _modeText:string;
    switch (_txMode){
      case '0':
        _modeText = this.wechat;
        break;
      case '1':
        _modeText = this.alipay;
        break;
      case '2':
        _modeText = this.banks;
        break;
    }

    return _modeText;
  }

  showText(_txMode){

    let _modeTexts:string;
    switch (_txMode){
      case '0':
        _modeTexts = '微信';
        break;
      case '1':
        _modeTexts = '支付宝';
        break;
      case '2':
        _modeTexts = '银行';
        break;
    }

    return _modeTexts;
  }

}
