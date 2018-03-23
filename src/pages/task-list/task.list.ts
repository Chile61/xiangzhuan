import { Component,OnInit } from '@angular/core';
import { NavController, RadioButton } from 'ionic-angular';
import { TaskListDetailsPage } from '../task-list-details/task-list-details';
import { HomeService } from '../../service/HomeService';
import { APP_SERVER_URL } from '../../providers/Constants';
import { GlobalService } from '../../service/global-service';
import { ToastService } from '../../service/toast.service';

export interface Currency {
  id: number;
  name: string;
}

@Component({
  selector: 'Page-TaskList',
  templateUrl: 'task.list.html'
})
export class TaskListPage implements OnInit{

   taskType:Array<any> = new Array();

   taskSort:Currency[] = [
      {id:0,name:'默认排序'},
      {id:1,name:'奖励最高'},
      {id:2,name:'最新上线'}
    ];

  private selectType:number;
  typeValue:any;
  sortValue:any = 0;

  private isShowSelect:boolean;
  taskList:Array<any> = new Array();
  hostURL;

  constructor(public navCtrl: NavController,
              private homeService:HomeService,
              private gs:GlobalService,
              private toastService:ToastService) {
    this.isShowSelect = false;



    //获取默认数据
    this.showTaskList({'_isType':'全部','_isOrde':0});

    this.hostURL = APP_SERVER_URL;

    //添加平台搜索条件
    let _obj = {id:'-1',name:'全部'};
    this.taskType.push(_obj);
    this.homeService.taskplatformService().then((res) => {
      for (let i in res) {
        let obj = {id:res[i].datavalue,name:res[i].dataname};
        this.taskType.push(obj);
      }

      this.typeValue = this.taskType[0].name;
    })
  }

  ngOnInit(){

  }

  ionViewWillEnter(){
    //获取默认数据
    this.showTaskList({'_isType':'全部','_isOrde':0});
  }

  //下拉列表点击事件
  taskListHandler(index:number){
    this.selectType = index;
    this.isShowSelect = true;
    //console.log(this.selectType)
  }

  //单选按钮选择
  dogSelect(radioButton: RadioButton) {
    this.isShowSelect = false;
    this.showTaskList({'_isType':this.typeValue,'_isOrde':this.sortValue});

    //console.log(this.typeValue);
    //console.log(this.sortValue);

  }

  //显示任务列表详情
  showTaskDetails(_id){
    let taskitems = this.taskList[_id];
    //console.log(taskitems);
    if(taskitems['taskcount'] == 0){
      this.toastService.presentToast('任务已完结','bottom');
    }else{
      this.navCtrl.push(TaskListDetailsPage);
      this.gs.set('taskItem',taskitems);
    }

  }

  //显示列表
  showTaskList(param:any){
    this.homeService.taskListService(param).then((res) =>{
      if(res.length>0){
        this.taskList = res;
      }

      //console.log('this.taskList==>',this.taskList)
    });
  }


}
