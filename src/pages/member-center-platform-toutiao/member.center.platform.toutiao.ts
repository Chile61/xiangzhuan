import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import { APP_SERVER_URL,API } from '../../providers/Constants';
import { LoadingServer } from '../../service/loading.server';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';
import { GlobalService } from '../../service/global-service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'Page-MemberCenterPlatformToutiao',
  templateUrl: 'member.center.platform.toutiao.html',
  providers: [Transfer, TransferObject, File]
})
export class MemberCenterPlatformToutiaoPage {
  private _imgurl:any = 0;
  private _filename:any = 0;

  private tou_tiao:any;
  private toutiao:any;
  private toutiaoIntro:any;

  constructor(public platform: Platform,
              public navCtrl: NavController,
              private camera: Camera,
              private transfer: Transfer,
              private loadings:LoadingServer,
              private toast:ToastService,
              private gs:GlobalService,
              private authService:AuthService,
              private homeService:HomeService) {
    if(this.gs.get('userInfo')){
      this.tou_tiao = this.gs.get('userInfo')['tou_tiao'];
      this.toutiao = this.gs.get('userInfo')['toutiao'];
      this.toutiaoIntro = this.gs.get('userInfo')['toutiaoIntro'];
      this._imgurl = this.gs.get('userInfo')['toutiaopic'];
    }
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  choosePhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true  //Corrects Android orientation quirks
    };
    this.camera.getPicture(options).then((imageData) => {

      this.loadings.startLoading();
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //console.log(this._imgurl);
      this.uploadImgHandler(base64Image);

    }, (err) => {

    });
  }


  uploadImgHandler(base64Image){

    this.platform.ready().then(() => {

      const fileTransfer: TransferObject = this.transfer.create();

      let options: FileUploadOptions = {
        fileKey: 'upfile',
        headers: {}

      };

      fileTransfer.upload(base64Image, APP_SERVER_URL+API.FileUploadServer, options)
        .then((data) => {
          this.loadings.endLoading();
          //alert('response=>'+data.response);
          this._filename = APP_SERVER_URL+API.uploadPath+data.response;
          if(this._filename == "0"){
            this.toast.presentToast('上传图片失败','bottom');
          }else{
            this._imgurl=base64Image;
          }
        }, (err) => {
          //alert("error"+JSON.stringify(err));
        });

    });

  }

  submitToutiao(){
    let objs = {
      'invitation':this.gs.get('userInfo')['invitation'],
      'tou_tiao':this.tou_tiao,
      'toutiao':this.toutiao,
      'toutiaoIntro':this.toutiaoIntro,
      'toutiaopic':this._filename
    };

    this.homeService.saveToutiaoService(objs).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toast.presentToast('对不起！提交失败','bottom');
      }
      if(_code == '1'){
        this.toast.presentToast('恭喜！成功提交','bottom');
        this.authService.getUserInfo(this.gs.get('username'));
        this.navCtrl.pop();
      }
    });
  }

}
