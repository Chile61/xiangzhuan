/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MemberCenterMyTaskPage } from './member.center.mytask';

@NgModule({
  declarations: [
    MemberCenterMyTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberCenterMyTaskPage)
  ],
  entryComponents: [
    MemberCenterMyTaskPage,
  ]
})
export class MemberCenterMyTaskPageModule {}
