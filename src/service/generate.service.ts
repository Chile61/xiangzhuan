/**
 * Created by lichun on 2018/1/24.
 */
import { Injectable } from '@angular/core';
import { GlobalService } from '../service/global-service';

@Injectable()
export class generateData {

  private _lengh:number = 6;
  private code:string='';

  constructor(private gs:GlobalService){

  }

  getCodeData() {
    this.code = '';
    for(let i:number=0;i<this._lengh;i++){
      this.code += Math.floor(Math.random()*10).toString();
    }

    if(this.code!=''){
      this.gs.set('codeData',this.code);
    }

    return this.code;

  }

}
