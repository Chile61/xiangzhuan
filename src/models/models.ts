export class Hobby {
  id: number;
  name: string;
  isSelect:boolean;
}

export class USER {
  avurl:string;
  nickname:string;
  gender:string;
  ages:string;
  region:string;
  trade:string;
  hobbys:Array<number>;

  constructor(obj?: any) {
    this.avurl      = obj && obj.avurl      || '../assets/imgs/moren.jpg';
    this.nickname   = obj && obj.nickname   || null;
    this.gender     = obj && obj.gender     || null;
    this.ages       = obj && obj.ages       || null;
    this.region     = obj && obj.region     || null;
    this.trade      = obj && obj.trade      || null;
    this.hobbys     = obj && obj.hobbys     || new Array();
  }
}

export class CASCADE {
  dataname:string;
  datavalue:string;
}
