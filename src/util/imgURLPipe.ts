/**
 * Created by lichun on 2017/9/18.
 */
import {Pipe} from '@angular/core';
import {APP_SERVER_URL} from '../providers/Constants';
@Pipe({
  name: 'ImgUrlPipe'
})
export class ImgURLPipe {

  constructor() {

  }
  transform(value: any): any {

    value.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
      //console.log('match-》',match);
      //console.log('capture==>',capture);
      let _arr:Array<string> = capture.split('/');
      let _length:number = _arr.length;

      value = value.replace(capture,APP_SERVER_URL+'/'+_arr[_length-4]+'/'+_arr[_length-3]+'/'+_arr[_length-2]+'/'+_arr[_length-1])

    });

    //console.log(value)
    return value;
  }
}

export var ImgURLPipeInjectables: Array<any> = [
  ImgURLPipe
];

