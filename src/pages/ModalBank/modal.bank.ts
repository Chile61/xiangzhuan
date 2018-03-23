import { Component,OnInit } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';

@IonicPage()
@Component({
  selector: 'Modal-Bank',
  templateUrl: 'modal.bank.html'
})
export class BankModal implements OnInit{

  private _bank:string;

  cascadeBank:Array<any> = new Array();

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController,
              private homeService:HomeService) {

    this._bank = params.get('bank')
  }

  ngOnInit(){
    this.homeService.bankService().then((res) => {
      //console.log('银行=>',res);
      this.cascadeBank = res;
    })
  }

  closeRegion(){
    this.viewCtrl.dismiss(null);
  }

  saveRegion(){
    this.viewCtrl.dismiss(this._bank);
  }

}
