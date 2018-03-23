import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'Modal-Gender',
  templateUrl: 'modal.gender.html'
})
export class GenderModal {

  private _gender:string;

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController) {

    this._gender = params.get('gender')
  }

  closeGender(){
    this.viewCtrl.dismiss(null);
  }

  saveGender(){
    this.viewCtrl.dismiss(this._gender);
  }

}
