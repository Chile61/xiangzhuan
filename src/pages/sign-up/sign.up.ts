import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../../service/HomeService';
import { Md5 } from 'ts-md5/dist/md5';
import { generateData } from '../../service/generate.service';
import { GlobalService } from '../../service/global-service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'Page-SginUp',
  templateUrl: 'sign.up.html'
})
export class SginUpPage {

  private usercreds:any;
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

    this.usercreds = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      invitation: [''],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(11)])],
      verification: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6)])]
    });
  }

  //注册
  signUp(value?: any){

    if(value.verification == this.gs.get('codeData')){
      if(value.password != value.confirmPassword){
        this.toast.presentToast('两次密码不一致！','bottom')
      }else{
        value.password = Md5.hashStr(value.password);
        value.confirmPassword = Md5.hashStr(value.confirmPassword);
        this.homeService.signUpService(value).then((res)=>{
          let _code = res['code'];
          if(_code == '0'){
            this.toast.presentToast('对不起！注册失败','bottom');
          }
          if(_code == '1'){
            this.toast.presentToast('恭喜！注册成功','bottom');
            this.navCtrl.pop();
          }
          if(_code == '2'){
            this.toast.presentToast('用户名重复','bottom');
          }
        })
      }
    }else {
      this.toast.presentToast('验证码错误！','bottom');
    }

  }

  //返回到登录页面
  backSignIn(){
    this.navCtrl.pop();
  }

  //获取短信验证码
  getVerification(value){
    this.isShowCodeBtn = true;
    let _value ={
      'mobile':value,
      'text':this.codeData.getCodeData()
    };

    console.log("value",_value);

    this.homeService.smsVerificationService(_value).then((res) =>{

      if(res['code'] == "1"){
        this.intervalHandler(this.tiems);
      }else{
        this.intervalHandler(10);
        this.toast.presentToast('获取验证码失败！','bottom')
      }
    });
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
