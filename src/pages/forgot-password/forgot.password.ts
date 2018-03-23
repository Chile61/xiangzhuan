import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { GlobalService } from '../../service/global-service';
import { ForgotPasswordConfirm } from '../forgot-password-confirm/forgot.password.confirm';
import { generateData } from '../../service/generate.service';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';


@Component({
  selector: 'Page-ForgotPassword',
  templateUrl: 'forgot.password.html'
})
export class ForgotPasswordPage {

  private forgotpw:any;
  private isShowCodeBtn:boolean = false;

  codeText:any = "获取短信验证码";
  private timer;
  private tiems:number = 300;

  constructor(public navCtrl: NavController,
              fb: FormBuilder,
              private homeService:HomeService,
              private codeData:generateData,
              private toast:ToastService,
              private gs:GlobalService) {
    this.forgotpw = fb.group({
      username: ['', Validators.required],
      oldmobile: ['', Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(11)])],
      verification: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6)])]
    });
  }

  backSignIn(){
    this.navCtrl.pop();
  }

  //确认修改
  forgotpwHandler(value?: any){

    if(value.verification == this.gs.get('codeData')){
      this.navCtrl.push(ForgotPasswordConfirm,{'username':value.username});
    }else{
      this.toast.presentToast('验证码错误！','bottom')
    }

  }

  //获取短信验证码
  getVerification(value){
    this.isShowCodeBtn = true;
    let _value ={
      'mobile':value,
      'text':this.codeData.getCodeData()
    };


    this.homeService.smsVerificationService(_value).then((res) =>{
      if(res['code'] == "1"){
        this.intervalHandler(this.tiems);
      }else{
        this.intervalHandler(10);
        this.toast.presentToast('获取验证码失败！','bottom')
      }
    })
  }

  //定时器
  intervalHandler(_times){
    this.timer = setInterval(()=>{
      _times --;
      this.codeText = _times+'S';
      if(_times == 0){
        clearInterval(this.timer);
        this.codeText = '获取短信验证码';
        this.isShowCodeBtn = false;
      }
    },1000)
  }


}
