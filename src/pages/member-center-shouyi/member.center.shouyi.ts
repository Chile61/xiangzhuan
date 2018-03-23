import { Component,OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { APP_SERVER_URL } from '../../providers/Constants';

@Component({
  selector: 'Page-MemberCenterShouyi',
  templateUrl: 'member.center.shouyi.html'
})
export class MemberCenterShouyiPage implements OnInit{

  private isIos:boolean = false;
  hostURL;

  private  myProfitArray:Array<any> = new Array();
  private totalProfit:number = 0;

  constructor(public navCtrl: NavController,
              platform: Platform,
              private homeService:HomeService,
              private gs:GlobalService) {
    if(platform.is('ios')){
      this.isIos = true;
    }
  }

  ngOnInit(){
    let _workInvi = this.gs.get('userInfo')['invitation'];
    this.hostURL = APP_SERVER_URL;
    this.homeService.myTaskService({'workInvi':_workInvi}).then((res) => {
      //console.log('我的收益=>',res);

      this.myProfitArray = res
        .filter(m => m.workState=='1');

      //console.log('我的收益=>2',this.myProfitArray);

      this.myProfitArray.forEach((_data,_index,_array) => {
        this.totalProfit = this.totalProfit + parseInt(_data.taskbonuses);
      })
    });


  }


  backLeftGo(){
    this.navCtrl.pop();
  }

}
