import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';
import { SginInPage } from '../sign-in/sign.in';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'Page-ForgotPasswordConfirm',
  templateUrl: 'forgot.password.confirm.html'
})
export class ForgotPasswordConfirm {

  private forgotpw:any;
  submitted: boolean = false;
  private _username:any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              fb: FormBuilder,
              private homeService:HomeService,
              private  toastService:ToastService) {
    this.forgotpw = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this._username = this.navParams.get('username')
  }

  backSignIn(){
    this.navCtrl.pop();
  }

  //确认修改
  forgotpwConfirmHandler(value?: any){

    value['username'] = this._username;
    value['password'] = Md5.hashStr(value.password);

    this.homeService.forgotpwService(value).then((res) => {
      if(res['code'] == '0'){
        this.toastService.presentToast('找回密码失败！','bottom');
      }

      if(res['code'] == '1'){
        this.toastService.presentToast('密码修改成功！','bottom');
        this.navCtrl.push(SginInPage);
      }

      if(res['code'] == '2'){
        this.toastService.presentToast('用户名错误！','bottom');
      }
    })
  }


}
