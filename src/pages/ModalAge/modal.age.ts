import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'Modal-Age',
  templateUrl: 'modal.age.html'
})
export class AgeModal {

  private _age:string;

  constructor(public navCtrl: NavController,
              params: NavParams,
              public viewCtrl: ViewController) {

    this._age = params.get('age')
  }

  closeAge(){
    this.viewCtrl.dismiss(null);
  }

  saveAge(){
    this.viewCtrl.dismiss(this._age);
  }

}
