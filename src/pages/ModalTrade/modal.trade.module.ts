/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TradeModal } from './modal.trade';

@NgModule({
  declarations: [
    TradeModal,
  ],
  imports: [
    IonicPageModule.forChild(TradeModal)
  ]
})
export class TradeModalModule {}
