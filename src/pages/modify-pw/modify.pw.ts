import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../../service/HomeService';
import { ModifyPwConfirm } from '../modify-pw-confirm/modify.pw.confirm';
import { generateData } from '../../service/generate.service';
import { ToastService } from '../../service/toast.service';
import { GlobalService } from '../../service/global-service';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'Page-ModifyPw',
  templateUrl: 'modify.pw.html'
})
export class ModifyPwPage {

  private modifypw:any;
  submitted: boolean = false;
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
    this.modifypw = fb.group({
      oldpassword: ['', Validators.required],
      oldmobile: ['', Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(11)])],
      verification: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6)])]
    });
  }

  //确认修改
  modifypwHandler(_: UIEvent, value?: any){
    console.log('Submitted', value);
    this.submitted = true;

    this.navCtrl.push(ModifyPwConfirm);
  /*  this.homeService.modifyService(value).then((res)=>{
      console.log('res22==>',res)
    })*/
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

  //
  nextModifyPW(value?: any){
    console.log('oldpassword',Md5.hashStr(value.oldpassword))
    console.log('username',this.gs.get('username'))

    if(value.verification == this.gs.get('codeData')){
      let _obj = {
        'username':this.gs.get('username'),
        'oldpassword':Md5.hashStr(value.oldpassword)
      };

      this.homeService.invOldPwService(_obj).then((res)=>{
        let _code = res['code'];
        if(_code == '0'){
          this.toast.presentToast('对不起！原密码错误','bottom');
        }
        if(_code == '1'){
          this.navCtrl.push(ModifyPwConfirm);
        }
        if(_code == '2'){
          this.toast.presentToast('用户名重复','bottom');
        }
      })

    }else{
      this.toast.presentToast('验证码错误！','bottom');
    }
  }

}
