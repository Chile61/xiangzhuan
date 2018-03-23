import { Component,OnInit } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';
import { HomeService } from '../../service/HomeService';

@IonicPage()
@Component({
  selector: 'Modal-Region',
  templateUrl: 'modal.region.html'
})
export class RegionModal implements OnInit{

  private _region:string;

  cascadeRegion:Array<any> = new Array();

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController,
              private homeService:HomeService) {

    this._region = params.get('region')
  }

  ngOnInit(){
    this.homeService.regionService().then((res) => {
      this.cascadeRegion = res;
    })
  }

  closeRegion(){
    this.viewCtrl.dismiss(null);
  }

  saveRegion(){
    this.viewCtrl.dismiss(this._region);
  }

}
