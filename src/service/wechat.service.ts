/**
 * Created by lichun on 2018/3/8.
 */
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class WechatService {

  constructor(public toastService:ToastService) {

  }

  shareWxTimeLine(shareTitle:string,shareDesc:string,shareImg:string){
    let wechat = (<any>window).Wechat;
    wechat.isInstalled(function (installed) {
      if(!installed){
        this.toastService.presentToast('您没有安装微信！','bottom',3000);
        return ;
      }
    }, function (reason) {
      this.toastService.presentToast("Failed: " + reason,'bottom',3000);
    });
    wechat.share({
      message: {
        title: shareTitle,
        description: shareDesc,
        thumb: shareImg,
        media: {
          type: wechat.Type.WEBPAGE,
          webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm"
        }
      },
      scene: wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      this.toastService.presentToast('分享成功','bottom',4000);
    }, function (reason) {
      console.log("Failed: " + reason);
    });

  }


  shareWxSession(shareTitle:string,shareDesc:string,shareImg:string){
    let wechat = (<any>window).Wechat;
    wechat.isInstalled(function (installed) {
      if(!installed){
        this.toastService.presentToast('您没有安装微信！','bottom',3000);
        return ;
      }
    }, function (reason) {
      this.toastService.presentToast("Failed: " + reason,'bottom',3000);
    });
    wechat.share({
      message: {
        title: shareTitle,
        description: shareDesc,
        thumb: shareImg,
        media: {
          type: wechat.Type.WEBPAGE,
          webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm"
        }
      },
      scene: wechat.Scene.SESSION   // share to SESSION
    }, function () {
      this.toastService.presentToast('分享成功','bottom',4000);
    }, function (reason) {
      console.log("Failed: " + reason);
    });
  }
}
