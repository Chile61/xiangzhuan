import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { MemberCenterHelpDetails } from '../member-center-help-details/member.center.help.details';

@Component({
  selector: 'Page-MemberCenterHelp',
  templateUrl: 'member.center.help.html'
})
export class MemberCenterHelpPage{

  private helpArray:Array<any> = new Array();

  constructor(public navCtrl: NavController,
              private homeService:HomeService,
              private gs:GlobalService) {
    this.showHelpData();
  }

  showHelpData(){
    this.homeService.getHelpService().then((res) => {
      this.helpArray = res;
      //console.log('helpArray=>',this.helpArray);
    })
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  helpDetails(index){
    this.gs.set('helpItemData',this.helpArray[index]);
    this.navCtrl.push(MemberCenterHelpDetails);
  }

}
