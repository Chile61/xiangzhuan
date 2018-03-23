import { Component,OnInit } from '@angular/core';
import { NavController,ModalController,IonicPage } from 'ionic-angular';
import { GlobalService } from '../../service/global-service';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';
import { AuthService } from '../../service/auth.service';

@IonicPage()
@Component({
  selector: 'Page-MemberCenterUser',
  templateUrl: 'member.center.user.html'
})
export class MemberCenterUserPage implements OnInit{

  hobby:Array<any> = new Array();

  userInfo;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private gs:GlobalService,
              private homeService:HomeService,
              private authService:AuthService,
              private toastService:ToastService) {


  }

  ngOnInit(){
    this.userInfo = this.gs.get('userInfo');

    //获取兴趣爱好数据
    this.homeService.hobbyService().then((res) => {
      this.hobby = res;
      for (let item of this.hobby) {
        item['isSelect'] = false;
      }

      //给已选择赋值
      if(this.userInfo.hobby != ""){
        let _arrs:Array<any>=new Array();
        let _str = this.userInfo.hobby;
        _arrs = _str.split('|');
        //console.log('_arrs',_arrs);
        for (let im of _arrs) {
          for (let items of this.hobby) {
            if(items.datavalue == im){
              items['isSelect'] = true;
            }

          }
        }
      }

    })
  }

  ionViewWillEnter(){
    //获取默认数据
    this.authService.getUserInfo(this.gs.get('username'));
    this.userInfo = this.gs.get('userInfo');

  }



  backLeftGo(){
    this.navCtrl.pop()
  }

  selectHobby(_index){
    this.hobby[_index].isSelect = !this.hobby[_index].isSelect
  }

  nicknameHandler(){
    let modal = this.modalCtrl.create('NickNameModal', { nickName: this.userInfo.cnnamee }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.userInfo.cnname = response;
      }
    });
  }

  genderHandler(){
    let modal = this.modalCtrl.create('GenderModal', { gender: this.userInfo.sex }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.userInfo.sex = response;
      }
    });
  }

  ageHandler(){
    let modal = this.modalCtrl.create('AgeModal', { age: this.userInfo.ages }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.userInfo.ages = response;
      }
    });
  }

  regionHandler(){
    let modal = this.modalCtrl.create('RegionModal', { age: this.userInfo.region }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.userInfo.region = response;
      }
    });
  }

  tradeHandler(){
    let modal = this.modalCtrl.create('TradeModal', { trade: this.userInfo.trade }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.userInfo.trade = response;
      }
    });
  }

  avatarHandler(){
    let modal = this.modalCtrl.create('AvatarModal', { avurl: this.userInfo.avatar }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        this.userInfo.avatar = response;
      }
    });
  }

  userSubmit(){
    let _arrs:Array<any> = new Array();
    let _hobby:string;
    for(let items of this.hobby){
      if(items.isSelect){
        _arrs.push(items.datavalue);
      }
    }

    _hobby = _arrs.join('|');

    this.userInfo['hobby'] = _hobby;

    this.homeService.updateUserInfoService(this.userInfo).then((res) => {
      if(res['code'] == '0'){
        this.toastService.presentToast('更新失败！','bottom')
      }
      if(res['code'] == '1'){
        this.toastService.presentToast('更新成功！','bottom')
      }
      if(res['code'] == '2'){
        this.toastService.presentToast('无此用户','bottom')
      }
    })

  }
}
