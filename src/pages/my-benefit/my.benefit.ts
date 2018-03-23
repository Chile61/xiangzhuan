import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as ChartJs from 'chart.js';

import { MyBenefitRankingPage } from '../my-benefit-ranking/my.benefit.ranking';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { AuthService } from '../../service/auth.service';

export interface CurrentData {
  tabType: number;
  nowData:string;
  conduct:string;
  balance:string;
  integral:number;
  totalData:string;
}

@Component({
  selector: 'Page-MyBenefit',
  templateUrl: 'my.benefit.html'
})
export class MyBenefitPage implements OnInit{

  private currentData:CurrentData;
  private isIos:boolean = false;
  private shouyiname = '账户总收益';

  private myprofitData:Array<any> = new Array();
  private myprofitLable:Array<any> = new Array();
  private levprofitData:Array<any> = new Array();
  private levprofitLable:Array<any> = new Array();

  @ViewChild('chartLine') chartLine: ElementRef;
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
    this.currentData = {
      tabType:0,
      nowData:'',
      conduct:'0',
      balance:'0',
      integral:0,
      totalData:'0'
    };

    if(this.authService.isAuthenticated()){
      this.showDatas();
    }


  }

  tabsHandler(__index:number){
    this.currentData.tabType = __index;
    if(this.authService.isAuthenticated()){
      if(!__index){
        this.showDatas();
      }else{
        this.showLevDatas();
      }
    }

  }

  showDatas(){
    //console.log('asdfasdf=>',this.gs.get('userInfo'))
    this.homeService.myBenefitService({'invitation':this.gs.get('userInfo')['invitation']}).then((res) => {
      //console.log('收益=>',res);
      this.myprofitLable = res.labels;
      this.myprofitLable.forEach((_vale,_index,_array) => {
        let vl:number= 0;
        res.data.forEach((_vales,_indexs,_arrays) => {
          if(_vales.workCompilte == _vale){
            vl += parseInt(_vales.workProfit);
          }
        });


        this.myprofitData.push(vl);
      });

      this.shouyiname = '账户总收益';

      this.currentData.nowData = this.myprofitData[6];
      this.currentData.conduct = res.jinxingData;
      this.currentData.integral = res.integral;
      this.currentData.totalData = res.totalData;

      //console.log('myprofitLable=>',this.myprofitLable)

      this.showTaskSy();

    });
  }

  showTaskSy(){

    ChartJs.Line(this.chartLine.nativeElement.getContext("2d"), {
      data: {
        labels : this.myprofitLable,
        datasets: [{
          label: '最近7天收益',
          data: this.myprofitData,
          backgroundColor:'rgba(55, 151, 219, 0.2)',
          borderColor: 'rgba(55, 151, 219, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  showLevDatas(){
    this.homeService.myLevService({'invitation':this.gs.get('userInfo')['invitation']}).then((res) => {
      //console.log('下级收益=>',res);
      this.levprofitLable = res.labels;
      this.levprofitLable.forEach((_vale,_index,_array) => {
        let vl:number= 0;
        res.data.forEach((_vales,_indexs,_arrays) => {
          if(_vales.workCompilte == _vale){
            vl += parseInt(_vales.workProfit);
          }
        });


        this.levprofitData.push(vl);
      });
      this.shouyiname = '下级享客总收益';
      this.currentData.totalData = res.totalData;

      this.showLevelSy();

    });
  }

  showLevelSy(){
    ChartJs.Line(this.chartLine.nativeElement.getContext("2d"), {
      data: {
        labels : this.levprofitLable,
        datasets: [{
          label: '最近7天收益',
          data: this.levprofitData,
          backgroundColor:'rgba(127, 97, 255, 0.2)',
          borderColor: 'rgba(127, 97, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  rankingGo(){
    this.navCtrl.push(MyBenefitRankingPage);
  }


}
