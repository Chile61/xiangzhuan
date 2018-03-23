/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MemberCenterUserPage } from './member.center.user';

@NgModule({
  declarations: [
    MemberCenterUserPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberCenterUserPage)
  ],
  entryComponents: [
    MemberCenterUserPage,
  ]
})
export class MemberCenterUserPageModule {}
