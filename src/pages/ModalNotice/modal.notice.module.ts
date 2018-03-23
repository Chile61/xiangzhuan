/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NoticeModal } from './modal.notice';

@NgModule({
  declarations: [
    NoticeModal,
  ],
  imports: [
    IonicPageModule.forChild(NoticeModal)
  ]
})
export class NoticeModalModule {}
