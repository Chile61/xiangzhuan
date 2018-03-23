import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';
import { GlobalService } from '../../service/global-service';

@IonicPage()
@Component({
  selector: 'Modal-Notice',
  templateUrl: 'modal.notice.html'
})
export class NoticeModal {

  private _id:string;
  private contents:Array<any> = new Array();

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController,
              private gs:GlobalService) {

    this._id = params.get('id');
    this.contents = this.gs.get('noticeItem');
    //console.log('_content=>',this.contents)
  }

  closeNotice(){
    this.viewCtrl.dismiss(this._id);
  }

}
