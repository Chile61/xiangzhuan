/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MemberCenterTixianBankPage } from './member.center.tixian.bank';

@NgModule({
  declarations: [
    MemberCenterTixianBankPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberCenterTixianBankPage)
  ],
  entryComponents: [
    MemberCenterTixianBankPage,
  ]
})
export class MemberCenterTixianBankPageModule {}
