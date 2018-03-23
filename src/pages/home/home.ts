import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TaskListDetailsPage } from '../task-list-details/task-list-details';
import { HomeService } from '../../service/HomeService';
import { APP_SERVER_URL } from '../../providers/Constants';
import { GlobalService } from '../../service/global-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  slides:Array<any> = new Array();
  private isIos:boolean = false;
  taskList:Array<any> = new Array();
  tixianList:Array<any> = new Array();

  len;
  hostURL;
  totals;
  timers;
  private times=0;

  @ViewChild('txBar')
  private txBar: ElementRef;

  constructor(public navCtrl: NavController,
              platform: Platform,
              private homeService:HomeService,
              private gs:GlobalService) {

    if(platform.is('ios')){
      this.isIos = true;
    }

    this.hostURL = APP_SERVER_URL;

    this.homeService.txListService().then((res) => {
      this.tixianList = res;
    })



  }

  ngOnInit(){

  }

  ionViewWillEnter(){
    //获取任务列表
    this.getTaskList();
    //获取轮播图
    this.getLunbo();

    //获取总发放奖金
    this.getTotal();

    //提现滚动
    this.tixian();
  }

  //显示任务列表详情
  showTaskDetails(_id){
    this.navCtrl.push(TaskListDetailsPage);
    this.gs.set('taskItem',this.taskList[_id]);
  }

  getLunbo(){
    this.homeService.getLunboService().then((res)=>{
      this.slides = res;
      this.len=this.slides.length;
      console.log('轮播图数据',res);
    })
  }

  //获取任务列表
  getTaskList(){
    this.homeService.taskListIndexService().then((res) =>{
      this.taskList = res;
      //console.log('taskList',this.taskList);
    })
  }

  getTotal(){
    this.homeService.getTotalService().then((res)=>{
      this.totals = res.data;
      //console.log('totals=>',this.totals)
    })
  }

  tixian(){
    this.timers = setInterval(()=>{
      this.times++;
      if(this.times>5){
        this.times = 0;
      }

      this.txBar.nativeElement.style.transition = 'top 0.5s';
      this.txBar.nativeElement.style.top = -1.5*this.times+'rem';

    },4000)

  }


}
