import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController,NavParams,ActionSheetController,ViewController,IonicPage,Platform } from 'ionic-angular';
import { Transfer, TransferObject} from '@ionic-native/transfer';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { APP_SERVER_URL,API } from '../../providers/Constants';
import { GlobalService } from '../../service/global-service';
import { LoadingServer } from '../../service/loading.server';
import { HomeService } from '../../service/HomeService';
import { ToastService } from '../../service/toast.service';


@IonicPage()
@Component({
  selector: 'Modal-Avatar',
  templateUrl: 'modal.avatar.html',
  providers: [Transfer, TransferObject, File]
})
export class AvatarModal {

  private _avurl:string;
  private _filename:string;
  result: string = '';
  stypesMt ={};

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController,
              public actionSheetCtrl: ActionSheetController,
              public platform: Platform,
              private camera: Camera,
              private loadings:LoadingServer,
              private transfer: Transfer,
              private toast:ToastService,
              private gs:GlobalService,
              private homeService:HomeService) {

    this._avurl = params.get('avurl');
    this.getImgInfo();
  }

  closeAvatar(){
    this.viewCtrl.dismiss(null);
  }

  selectAvatar(){
    this.result = '';

    this.actionSheetCtrl.create()
      .addButton({
        text: '拍照',
        handler: () => {
          this.takePhoto()
        }
      })
      .addButton({
        text: '从手机相册选择',
        handler: () => {
          this.choosePhoto();
        }
      })

      .addButton({
        text: '取消',
        role: 'cancel',
        icon: !this.platform.is('ios') ? 'close' : null,
        handler: () => {
          console.log('Cancel clicked');
          this.result = 'Canceled';
        }
      })
      .present();
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA,//拍照时，此参数必须有，否则拍照之后报错，照片不能保存
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadImgHandler(base64Image);

    }, (err) => {

    });
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
          this._avurl=base64Image;
          //alert(data.response)
          this._filename = APP_SERVER_URL+API.uploadPath+data.response;

          this.saveAva();
        }, (err) => {
          //alert("error"+JSON.stringify(err));
        });

    });

  }

  saveAva(){
    let objs = {
      'avatar':this._filename,
      'invitation':this.gs.get('userInfo')['invitation'],
      'randomNum':Math.random()
    };

    this.homeService.saveAvatrService(objs).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toast.presentToast('对不起！上传头像失败','bottom');
      }
      if(_code == '1'){
        this.toast.presentToast('恭喜！上传头像成功','bottom');
        this.viewCtrl.dismiss(this._filename);
      }
    });
  }

  getImgInfo(){
     let window_height:number = document.documentElement.clientHeight;
     let window_width:number = document.documentElement.clientWidth;
     let _img = new Image();
     _img.src = this._avurl;


     let _s = _img.width;
     let _h = _img.height;

     let mtop = (window_height - 48 - window_width/_s*_h)/2

     this.stypesMt = {'margin-top':mtop+'px'}

     console.log('window_height=>',window_height)
     console.log('window_width=>',window_width)
     console.log('_s=>',_s)
     console.log('_h=>',_h)
  }

}
