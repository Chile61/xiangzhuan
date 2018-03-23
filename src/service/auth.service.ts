import { Injectable } from '@angular/core';
import { GlobalService } from './global-service';
import { HomeService } from './HomeService';
import { ToastService } from './toast.service';

@Injectable()
export class AuthService {

  private isLoggedin: any = false;

  constructor(private gs:GlobalService,
              private homeService:HomeService,
              private toastService:ToastService) {

  }

  storeUserCredentials(username:string) {
    this.gs.set('username',username,true);
    //this.isLoggedin = !!true;
  }

  isAuthenticated() {
    if(this.gs.get('username')){
      this.getUserInfo(this.gs.get('username'));
      if(this.gs.get('userInfo')){
        this.isLoggedin = true;
      }else{
        this.isLoggedin = false;
      }

    }else{

    }
    return this.isLoggedin;
  }

  logout() {
    this.isLoggedin = false;
    window.localStorage.clear();
  }

  getUserInfo(_username){
    this.homeService.userInfoService(_username).then((res)=>{
      //console.log('会员信息',res);

      if(res['code'] == '0'){
        this.toastService.presentToast('会员信息失败','bottom')
      }

      if(res['code'] == '1'){
        this.gs.set('userInfo',res['data']);
      }

      //console.log(this.gs.get('userInfo'));
    })
  }

}
