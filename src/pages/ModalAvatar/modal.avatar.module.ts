/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AvatarModal } from './modal.avatar';

@NgModule({
  declarations: [
    AvatarModal,
  ],
  imports: [
    IonicPageModule.forChild(AvatarModal)
  ]
})
export class AvatarModalModule {}
