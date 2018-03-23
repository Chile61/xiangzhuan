import { Component } from '@angular/core';
import { NavController,NavParams,Platform,ViewController,IonicPage } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import { APP_SERVER_URL,API } from '../../providers/Constants';
import { LoadingServer } from '../../service/loading.server';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';

@IonicPage()
@Component({
  selector: 'Modal-MyTask',
  templateUrl: 'modal.my.task.html',
  providers: [Transfer, TransferObject, File]
})
export class MyTaskModal {

  private _id:string;
  private _imgurl1:any = 0;
  private _imgurl2:any = 0;
  private _imgurl3:any = 0;
  private _imgurl4:any = 0;
  private _imgurl5:any = 0;
  private _imgurl6:any = 0;
  private _filename1:any = 0;
  private _filename2:any = 0;
  private _filename3:any = 0;
  private _filename4:any = 0;
  private _filename5:any = 0;
  private _filename6:any = 0;

  private nums:any = 0;
  private webURL:string;

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController,
              public platform: Platform,
              private camera: Camera,
              private transfer: Transfer,
              private loadings:LoadingServer,
              private toast:ToastService,
              private homeService:HomeService) {

    this._id = params.get('id');
  }

  closeNotice(){
    this.viewCtrl.dismiss('-1');
  }

  upPhoto(_num){
    this.nums = _num;
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
          switch (this.nums){
            case 1:
              this._imgurl1=base64Image;
              this._filename1 = APP_SERVER_URL+API.uploadPath+data.response;
              break;
            case 2:
              this._imgurl2=base64Image;
              this._filename2 = APP_SERVER_URL+API.uploadPath+data.response;
              break;
            case 3:
              this._imgurl3=base64Image;
              this._filename3 = APP_SERVER_URL+API.uploadPath+data.response;
              break;
            case 4:
              this._imgurl4=base64Image;
              this._filename4 = APP_SERVER_URL+API.uploadPath+data.response;
              break;
            case 5:
              this._imgurl5=base64Image;
              this._filename5 = APP_SERVER_URL+API.uploadPath+data.response;
              break;
            case 6:
              this._imgurl6=base64Image;
              this._filename6 = APP_SERVER_URL+API.uploadPath+data.response;
              break;

          }

          //alert(data.response)

        }, (err) => {
          //alert("error"+JSON.stringify(err));
        });

    });

  }

  submitMyTask(){
    let objs = {
      'id':this._id,
      'webURL':this.webURL,
      'taskPic':this._filename1+'|'+this._filename2+'|'+this._filename3+'|'+this._filename4+'|'+this._filename5+'|'+this._filename6
    };

    this.homeService.mytaskupdateService(objs).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toast.presentToast('对不起！任务提交失败','bottom');
      }
      if(_code == '1'){
        this.toast.presentToast('恭喜！任务提交成功','bottom');
        this.viewCtrl.dismiss('ok');
      }
    });
  }

}
