import { Component,OnInit } from '@angular/core';
import { NavController, Platform, App } from 'ionic-angular';
import { MemberCenterHelpPage } from '../member-center-help/member.center.help';
import { MemberCenterShouyiPage } from '../member-center-shouyi/member.center.shouyi';
import { MemberCenterTixianPage } from '../member-center-tixian/member.center.tixian';
import { MemberCenterMessagePage } from '../member-center-message/member.center.message';
import { MemberCenterFeedPage } from '../member-center-feed/member.center.feed';
import { ModifyPwPage } from '../modify-pw/modify.pw';
import { MemberCenterContactUsPage } from '../member-center-contactus/member.center.contactus';
import { MemberCenterPlatformPage } from '../member-center-platform/member.center.platform';
import { MemberCenterCodePage } from '../member-center-code/member.center.code';
import { MemberCenterMyTaskPage } from '../member-center-mytask/member.center.mytask';
import { MemberCenterSharkerPage } from '../member-center-sharker/member.center.sharker';
import { MemberCenterUserPage } from '../member-center-user/member.center.user';
import { SginInPage } from '../sign-in/sign.in';
import { SginUpPage } from '../sign-up/sign.up';

import { GlobalService } from '../../service/global-service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'Page-MemberCenter',
  templateUrl: 'member.center.html'
})
export class MemberCenterPage implements OnInit{

  private isIos:boolean = false;
  userInfo;
  private isLoginin:any;

  constructor(public navCtrl: NavController,
              platform: Platform,
              private gs:GlobalService,
              private authService:AuthService,
              public appCtrl:App) {

    if(platform.is('ios')){
      this.isIos = true;
    }

    //console.log('this.isIos=>',this.isIos)



  }

  ngOnInit(){

  }

  ionViewWillEnter(){

    this.isLoginin = this.authService.isAuthenticated();

    if(this.isLoginin){
      //获取默认数据
      this.authService.getUserInfo(this.gs.get('username'));
      this.userInfo = this.gs.get('userInfo');
      if(this.userInfo.avatar == ""){
        this.userInfo.avatar = "assets/imgs/moren.jpg";
      }
    }

  }

  shouyiGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterShouyiPage);
    }else{
      this.singInGo();
    }
  }

  helpGo(){
    this.appCtrl.getRootNav().push(MemberCenterHelpPage);
  }

  tixianGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterTixianPage);
    }else{
      this.singInGo();
    }
  }

  messageGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterMessagePage);
    }else{
      this.singInGo();
    }
  }

  feedGo(){
    this.appCtrl.getRootNav().push(MemberCenterFeedPage);
  }

  modifypwGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(ModifyPwPage);
    }else{
      this.singInGo();
    }
  }

  contactUsGo(){
    this.appCtrl.getRootNav().push(MemberCenterContactUsPage);
  }

  platformGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterPlatformPage);
    }else{
      this.singInGo();
    }
  }

  codeGo(){
    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterCodePage,{'_code':this.userInfo.invitation});
    }else{
      this.singInGo();
    }

  }

  mytaskGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterMyTaskPage);
    }else{
      this.singInGo();
    }
  }

  sharkerGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterSharkerPage);
    }else{
      this.singInGo();
    }
  }

  userGo(){

    if(this.authService.isAuthenticated()){
      this.appCtrl.getRootNav().push(MemberCenterUserPage);
    }else{
      this.singInGo();
    }
  }

  logOut(){
    this.authService.logout();

    this.appCtrl.getRootNav().push(SginInPage);
  }

  singInGo(){
    this.appCtrl.getRootNav().push(SginInPage);
  }

  singUpGo(){
    this.appCtrl.getRootNav().push(SginUpPage);
  }


}
