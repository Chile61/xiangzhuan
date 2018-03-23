import {Injectable} from "@angular/core";
import { HttpClient,HttpHeaders} from "@angular/common/http";
import "rxjs/add/operator/map";
/*import * as _ from 'lodash';*/

@Injectable()
export class HttpService {

  constructor(public http: HttpClient) {}

  public get(url: string, paramObj: any) {
    return this.http.get(url + this.toQueryString(paramObj))
      .toPromise()
      .then(res => {return res;})
      .catch(error => {return error;});
  }

  //application/x-www-form-urlencoded
  //application/json

  public post(url: string, paramObj: any) {
    //console.log('ddd=>',this.toBodyString(paramObj))
    return this.http.post(url,this.toBodyString(paramObj),{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
      .toPromise()
      .then(res => {return res;})
      .catch(error => {return error;});
  }


  /**
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  /**
   *
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }


  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}
