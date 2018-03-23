import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController,ModalController,IonicPage } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { Md5 } from 'ts-md5/dist/md5';
import { generateData } from '../../service/generate.service';
import { GlobalService } from '../../service/global-service';
import { ToastService } from '../../service/toast.service';


@IonicPage()
@Component({
  selector: 'Page-MemberCenterTixianBank',
  templateUrl: 'member.center.tixian.bank.html'
})
export class MemberCenterTixianBankPage {

  private banks:string;
  private bankData:any;

  private isShowCodeBtn:boolean = false;

  codeText:any = "发送验证码";
  private timer;
  private tiems:number = 300;

  constructor(public navCtrl: NavController,
                            fb: FormBuilder,
              public modalCtrl: ModalController,
              private homeService:HomeService,
              private codeData:generateData,
              private toast:ToastService,
              private gs:GlobalService) {
    this.bankData = fb.group({
      cardNum: ['', Validators.required],
      cardName: ['', Validators.required],
      cardPw: ['', Validators.required],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(11)])],
      verification: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6)])]
    });
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  bankHandler(){
    let modal = this.modalCtrl.create('BankModal', { bank: this.banks }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.banks = response;
      }
    });
  }

  insertBank(value?: any){
    value['banks'] = this.banks;
    value['invitation'] = this.gs.get('userInfo')['invitation'];
    value.cardPw = Md5.hashStr(value.cardPw);
    console.log(value);
    if(value.verification == this.gs.get('codeData')){
      if(this.banks ==""){
        this.toast.presentToast('请选择银行！','bottom');
      }else{
        this.homeService.upDateBankService(value).then((res) => {
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
    }else {
      this.toast.presentToast('验证码错误！','bottom');
    }
  }

  //获取短信验证码
  getVerification(value){
    this.isShowCodeBtn = true;
    let _value ={
      'mobile':value,
      'text':this.codeData.getCodeData()
    };

    //console.log('_value=>',_value)
    this.homeService.smsVerificationService(_value).then((res) =>{
      console.log('code=>',res['code'])
      if(res['code'] == "1"){
        this.intervalHandler(this.tiems);
      }else{
        this.intervalHandler(10);
        this.toast.presentToast('获取验证码失败！','bottom')
      }
    })
  }

  //定时器
  intervalHandler(_times) {
    this.timer = setInterval(() => {
      _times--;
      this.codeText = _times + 'S';
      if (_times == 0) {
        clearInterval(this.timer);
        this.codeText = '发送验证码';
        this.isShowCodeBtn = false;
      }
    }, 1000)
  }
}
