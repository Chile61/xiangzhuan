import { Component,OnInit } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';

@IonicPage()
@Component({
  selector: 'Modal-Trade',
  templateUrl: 'modal.trade.html'
})
export class TradeModal implements OnInit{

  private _trade:string;
  cascadeTrade:Array<any> = new Array();

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController,
              private homeService:HomeService) {

    this._trade = params.get('trade')
  }

  ngOnInit(){
    this.homeService.tradeService().then((res) => {
      this.cascadeTrade = res;
    })
  }

  closeTrade(){
    this.viewCtrl.dismiss(null);
  }

  saveTrade(){
    this.viewCtrl.dismiss(this._trade);
  }

}
