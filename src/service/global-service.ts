import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const __prefix = 'DR_APP_';

@Injectable()
export class GlobalService {
  get(attr) {
    // if (typeof this[attr] === 'undefined') return;

    let __value = this[attr];
    if (__value) {
      return __value;
    }
    __value = JSON.parse(window.localStorage.getItem(__prefix + attr));
    if (typeof __value === 'undefined') {
      return;
    }
    this[attr] = __value;
    return __value;
  }

  set(attr, val, isSaveLocation = false) {
    if (typeof val === 'undefined') return;
    this[attr] = val;
    if (!!isSaveLocation) {
      window.localStorage.setItem(__prefix + attr, JSON.stringify(val));
    }
    return this[attr];
  }
}

