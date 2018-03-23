import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SginUpPage } from '../sign-up/sign.up';
import { ForgotPasswordPage } from '../forgot-password/forgot.password';
import { TabsPage } from '../tabs/tabs';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';
import { AuthService } from '../../service/auth.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'Page-SginIn',
  templateUrl: 'sign.in.html'
})
export class SginInPage {

  private users: any;

  constructor(public navCtrl: NavController,
              private homeService:HomeService,
              private toast:ToastService,
              private authService:AuthService) {
    this.users = {
      username: '',
      password: ''
    }

  }
  //登录
  signIn(users){
    //console.log(users);
    //this.navCtrl.push(TabsPage);
    let _pw = Md5.hashStr(users.password);
    let _obj = {
      'username':users.username,
      'password':_pw
    };

    //console.log('_obj=>',_obj);

    this.homeService.signInService(_obj).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toast.presentToast('登录失败！','bottom')
      }
      if(_code == '1'){
        //this.toast.presentToast('登录成功！','bottom');
        this.authService.getUserInfo(users.username);//获取会员信息
        this.authService.storeUserCredentials(users.username);//写入本地存储
        this.navCtrl.push(TabsPage);
      }
      if(_code == '2'){
        this.toast.presentToast('密码错误！','bottom')
      }
    })
  }
  //注册
  signUpTo(){
    this.navCtrl.push(SginUpPage);
  }

  //忘记密码
  forgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  //返回到登录页面
  backSignIn(){
    this.navCtrl.pop();
  }



}
