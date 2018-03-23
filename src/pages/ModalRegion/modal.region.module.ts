/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RegionModal } from './modal.region';

@NgModule({
  declarations: [
    RegionModal,
  ],
  imports: [
    IonicPageModule.forChild(RegionModal)
  ]
})
export class RegionModalModule {}
