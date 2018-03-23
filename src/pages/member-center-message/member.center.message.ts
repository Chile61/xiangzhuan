import { Component } from '@angular/core';
import { NavController,ModalController,IonicPage } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';

@IonicPage()
@Component({
  selector: 'Page-MemberCenterMessage',
  templateUrl: 'member.center.message.html'
})
export class MemberCenterMessagePage {

  private messageType:number;
  private readArray:Array<any> = new Array();
  private UnreadArray:Array<any> = new Array();
  private readID:string;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private homeService:HomeService,
              private gs:GlobalService) {
    this.messageType = 0;
    this.getMessageData();
  }

  showMessages(_index){
    this.messageType = _index;
    this.getMessageData();
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  getMessageData(){
    this.readArray = [];
    this.UnreadArray = [];
    this.homeService.getNoticeService(this.gs.get('userInfo')['invitation']).then((res) => {
      //console.log('系统消息=>',res);
      //console.log('readID=>',this.readID);
      this.readID = res.noticeRead;
      if(this.readID == '0'){
        this.UnreadArray = res.data;
      }else{
        let _arrs:Array<any>=new Array();
        let _str = this.readID;
        let isT:boolean = false;
        _arrs = _str.split('|');
        //过滤已读和未读消息
        for (let item of res.data) {
          for (let im of _arrs) {
            if(im == item.id){
              isT = true;
            }
          }
          if(isT){
            this.readArray.push(item);
          }else{
            this.UnreadArray.push(item);
          }

          isT = false;
        }
      }

      //console.log('已读=>',this.readArray);
      //console.log('未读=>',this.UnreadArray);
    })
  }

  NoticeDetails(_index,_id){
    //console.log('UnreadArray=>',this.UnreadArray);
    //console.log('_index=>',_index);
    //console.log('UnreadArray=>',this.UnreadArray[_index]);
    if(!this.messageType){
      this.gs.set('noticeItem',this.readArray[_index]);
    }else {
      this.gs.set('noticeItem',this.UnreadArray[_index]);
    }

    let modal = this.modalCtrl.create('NoticeModal', { id: _id }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        if(this.messageType){//判断是否是未读消息关闭窗口了
          this.homeService.setNoticeService(this.readID+'|'+response,this.gs.get('userInfo')['invitation']).then((res) => {
            //console.log('修改消息状态返回值=>',res);
          })
        }
      }
    });

  }

}
