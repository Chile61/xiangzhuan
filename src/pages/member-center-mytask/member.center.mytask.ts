import { Component,OnInit } from '@angular/core';
import { NavController ,ModalController,IonicPage} from 'ionic-angular';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { APP_SERVER_URL } from '../../providers/Constants';
import { TaskListDetailsPage } from '../task-list-details/task-list-details';

@IonicPage()
@Component({
  selector: 'Page-MemberCenterMyTask',
  templateUrl: 'member.center.mytask.html'
})
export class MemberCenterMyTaskPage implements OnInit{

  private taskType:Array<number> = [1,0,0];
  private myTaskArray:Array<any> = new Array();
  private taskArray:Array<any> = new Array();

  hostURL;

  constructor(public navCtrl: NavController,
              private homeService:HomeService,
              public modalCtrl: ModalController,
              private gs:GlobalService) {

    let _workInvi = this.gs.get('userInfo')['invitation'];
    this.hostURL = APP_SERVER_URL;
    //console.log(_workInvi)
    this.homeService.myTaskService({'workInvi':_workInvi,randomNum:Math.random()}).then((res) => {
      //console.log('我的任务=>',res);
      this.myTaskArray = res;
      this.showTypeTask("0");
    })

  }

  ngOnInit(){

  }

  showTask(_index){
    this.taskType.forEach((val,index) =>{
      this.taskType[index] = 0;
    });

    this.taskType[_index] = 1;

    this.showTypeTask(String(_index));
  }

  backLeftGo(){
    this.navCtrl.pop();
  }

  showTypeTask(_id:string){
    this.taskArray = [];

    this.taskArray = this.myTaskArray
      .filter(m => m.workState==_id);

    //console.log('taskArray=>',this.taskArray)
  }

  submitMyTask(_id){

    let modal = this.modalCtrl.create('MyTaskModal', { id: _id }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
      cssClass: 'my-modal my-blue-modal'
    });
    modal.present();

    modal.onDidDismiss((response: any) => {
      if(response != null){
        if(response == 'ok'){
          console.log(response);
        }
      }
    });
  }

  showDetails(_id){
    let taskitems = this.taskArray[_id];
    //console.log(taskitems)
    this.navCtrl.push(TaskListDetailsPage);
    this.gs.set('taskItem',taskitems);
  }

}
