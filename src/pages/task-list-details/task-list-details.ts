import { Component,OnInit} from '@angular/core';
import { NavController} from 'ionic-angular';
import { GlobalService } from '../../service/global-service';
import { APP_SERVER_URL } from '../../providers/Constants';
import { ToastService } from '../../service/toast.service';
import { HomeService } from '../../service/HomeService';
/*import { WechatService } from '../../service/wechat.service';*/


@Component({
  selector: 'Page-TaskListDetails',
  templateUrl: 'task-list-details.html'
})
export class TaskListDetailsPage implements OnInit{

  itemTask:Array<any> = new Array();
  hostURL;
  result: string = '';

  constructor(public navCtrl: NavController,
              private gs:GlobalService,
              private homeService:HomeService,
              /*private wechatService:WechatService,*/
              private toastService:ToastService) {
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  ngOnInit(){
    if(this.gs.get('taskItem')!=null){
      this.itemTask = this.gs.get('taskItem');
    }
    this.hostURL = APP_SERVER_URL;

    //console.log('taskItem=>',this.itemTask)
  }


  shareHandler(){

    //this.wechatService.shareWxTimeLine(this.itemTask['taskname'],'描述描述','')

    if(this.gs.get('userInfo')){
      console.log(typeof this.gs.get('userInfo')['plaformCheck'])
      console.log(this.gs.get('userInfo'))
      if(this.gs.get('userInfo')['plaformCheck'] == 0 || this.gs.get('userInfo')['plaformCheck'] == null){
        this.toastService.presentToast('请提交平台审核','bottom');
      }else{

        let isvertical = this.itemTask['taskvertical'];
        //console.log('isvertical=>',isvertical)
        //判断是否为垂直
        if(isvertical=="1"){

        /*|| this.gs.get('userInfo')['trade'] == '请选择您的职业' || this.gs.get('userInfo')['region'] == '请选择您的所在地'*/

          if(this.gs.get('userInfo')['ages'] == '未设置' || this.gs.get('userInfo')['sex'] == '未设置'){
            this.toastService.presentToast('请完善个人信息','bottom');
          }else{
            let isLingqu:boolean = false;
            let taskage = this.itemTask['taskage'];
            let memberage = parseInt(this.gs.get('userInfo')['ages']);
            let strs:Array<any> = taskage.split("~");
            let isAge:boolean = false;
            if(memberage >= parseInt(strs[0]) && memberage <= parseInt(strs[1])){
              isAge= true;
            }

            //console.log(this.gs.get('userInfo')['sex']);
            //console.log(this.itemTask['tasksex']);

            if(isAge && this.gs.get('userInfo')['sex'] == this.itemTask['tasksex']){
              isLingqu = true;
            }

            if(isLingqu){
              this.lingquTask();
            }else{
              this.toastService.presentToast('个人信息与任务不符','bottom');
            }
          }

        }else{
          this.lingquTask();
        }

      }
    }else{
      this.toastService.presentToast('请先登录','bottom');
    }

  }


  lingquTask(){
    let fenNum:number;

    switch (this.itemTask['taskplatform']){
      case '微信':

        fenNum = parseInt(this.gs.get('userInfo')['webxinnum']);
        break;

      case '微博':
        fenNum = parseInt(this.gs.get('userInfo')['weibonum']);
        break;

      case '今日头条':
        fenNum = parseInt(this.gs.get('userInfo')['toutiao']);
        break;
    }

    //console.log('taskbonuses=>',this.itemTask['taskbonuses'])
    //console.log('parseInttaskbonuses=>',parseInt(this.itemTask['taskbonuses']))
    //console.log('fenNum=>',fenNum)
    //console.log('fenNum/1000=>',fenNum/1000)

    let lvs:any =(fenNum/1000).toFixed(1);

    let obj = {
      "taskid":this.itemTask['id'],
      "userid":this.itemTask['userid'],
      "username":this.gs.get('username'),
      "workInvi":this.gs.get('userInfo')['invitation'],
      "workParentInvi":this.gs.get('userInfo')['parentInvi'],
      "workProfit":lvs*parseInt(this.itemTask['taskbonuses']),
      "tasktype":this.itemTask['tasktype'],
      "taskplatform":this.itemTask['taskplatform']
    };

    //console.log('obj==>',obj)

    this.homeService.worksService(obj).then((res) => {
      let _code = res['code'];
      if(_code == '0'){
        this.toastService.presentToast('对不起！任务失败','bottom');
      }
      if(_code == '1'){
        this.toastService.presentToast('恭喜！任务提交成功','bottom');
      }
      if(_code == '2'){
        this.toastService.presentToast('任务提交重复','bottom');
      }
    })
  }


}

