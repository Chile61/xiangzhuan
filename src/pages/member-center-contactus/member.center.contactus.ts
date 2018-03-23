import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'Page-MemberCenterContactUs',
  templateUrl: 'member.center.contactus.html'
})
export class MemberCenterContactUsPage {


  constructor(public navCtrl: NavController) {

  }


  backLeftGo(){
    this.navCtrl.pop();
  }


}
