/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyTaskModal } from './modal.my.task';

@NgModule({
  declarations: [
    MyTaskModal,
  ],
  imports: [
    IonicPageModule.forChild(MyTaskModal)
  ]
})
export class MyTaskModalModule {}
