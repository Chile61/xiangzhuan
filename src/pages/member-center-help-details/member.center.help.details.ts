import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalService } from '../../service/global-service';

@Component({
  selector: 'Page-MemberCenterHelpDetails',
  templateUrl: 'member.center.help.details.html'
})
export class MemberCenterHelpDetails {

  private itemHelp:Array<any> = new Array();
  constructor(public navCtrl: NavController,
              private gs:GlobalService) {
    this.itemHelp = this.gs.get('helpItemData');
    //console.log('itemHelp=>',this.itemHelp)
  }


  backLeftGo(){
    this.navCtrl.pop();
  }

}
