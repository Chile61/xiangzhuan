/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GenderModal } from './modal.gender';

@NgModule({
  declarations: [
    GenderModal,
  ],
  imports: [
    IonicPageModule.forChild(GenderModal)
  ]
})
export class GenderModalModule {}
