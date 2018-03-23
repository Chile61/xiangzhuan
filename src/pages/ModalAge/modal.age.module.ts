/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AgeModal } from './modal.age';

@NgModule({
  declarations: [
    AgeModal,
  ],
  imports: [
    IonicPageModule.forChild(AgeModal)
  ]
})
export class AgeModalModule {}
