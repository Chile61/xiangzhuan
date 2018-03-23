/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NickNameModal } from './modal.nickname';

@NgModule({
  declarations: [
    NickNameModal,
  ],
  imports: [
    IonicPageModule.forChild(NickNameModal)
  ]
})
export class NickNameModalModule {}
