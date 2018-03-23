import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'Page-MyBenefitRanking',
  templateUrl: 'my.benefit.ranking.html'
})
export class MyBenefitRankingPage implements OnInit{

  private isIos:boolean = false;
  private rankArray:Array<any> = new Array();

  private myRank:any;
  private myPorf:any;

  constructor(public navCtrl: NavController,
              platform: Platform,
              private homeService:HomeService,
              private gs:GlobalService,
              private authService:AuthService) {

    if(platform.is('ios')){
      this.isIos = true;
    }

  }

  ngOnInit(){

    if(this.authService.isAuthenticated()){
      this.homeService.rankServer().then((res)=>{
        //console.log('排行=>',res);
        this.rankArray = res;
        this.rankArray.forEach((_vaue,_index,_array) => {
          if(_vaue.invitation == this.gs.get('userInfo')['invitation']){
            this.myPorf = _vaue.userProfit;
            this.myRank = _index + 1;
          }
        })
      })
    }

  }

  backLeftGo(){
    this.navCtrl.pop();
  }



}
