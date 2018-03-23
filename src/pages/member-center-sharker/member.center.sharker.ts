import { Component,OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';

@Component({
  selector: 'Page-MemberCenterSharker',
  templateUrl: 'member.center.sharker.html'
})
export class MemberCenterSharkerPage implements OnInit{

  private isIos:boolean = false;
  private sharkerArray:Array<any> = new Array();
  private invis;
  private tatals:number = 0;

  constructor(public navCtrl: NavController,
              platform: Platform,
              private homeService:HomeService,
              private gs:GlobalService) {
    if(platform.is('ios')){
      this.isIos = true;
    }
  }

  ngOnInit(){
    this.invis = this.gs.get('userInfo')['invitation'];
    this.homeService.sharkerService({'invitation':this.invis}).then((res) => {
      this.sharkerArray = res;

      this.sharkerArray.forEach((_value,_index,_array) => {
        this.tatals = this.tatals + parseInt(_value.profitTotal);
        //console.log(this.tatals)
      });
      console.log('下级享客',res)
    })
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

}
