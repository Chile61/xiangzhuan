/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MemberCenterMessagePage } from './member.center.message';

@NgModule({
  declarations: [
    MemberCenterMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberCenterMessagePage)
  ],
  entryComponents: [
    MemberCenterMessagePage,
  ]
})
export class MemberCenterMessagePageModule {}
