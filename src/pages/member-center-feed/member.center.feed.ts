import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController ,Platform} from 'ionic-angular';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import { APP_SERVER_URL,API } from '../../providers/Constants';
import { LoadingServer } from '../../service/loading.server';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';


@Component({
  selector: 'Page-MemberCenterFeed',
  templateUrl: 'member.center.feed.html',
  providers: [Transfer, TransferObject, File]
})
export class MemberCenterFeedPage {

  private _imgurl:any = 0;
  private _filename:any = 0;
  private feedContent:any;
  storageDirectory: string = '';

  constructor(public platform: Platform,
              public navCtrl: NavController,
              private camera: Camera,
              private transfer: Transfer,
              private loadings:LoadingServer,
              private toast:ToastService,
              private homeService:HomeService) {

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
    }
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
          this._imgurl=base64Image;
          //alert(data.response)
          this._filename = APP_SERVER_URL+API.uploadPath+data.response;
        }, (err) => {
          //alert("error"+JSON.stringify(err));
        });

    });

  }

  submitFeed(){
    let objs = {
      'feedContent':this.feedContent,
      'feedPic':this._filename
    };

    this.homeService.saveFeedService(objs).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toast.presentToast('对不起！反馈失败','bottom');
      }
      if(_code == '1'){
        this.toast.presentToast('恭喜！反馈已提交','bottom');
        this.navCtrl.pop();
      }
    });
  }

}
