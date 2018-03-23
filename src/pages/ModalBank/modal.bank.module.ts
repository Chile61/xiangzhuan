/**
 * Created by lichun on 2018/1/20.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BankModal } from './modal.bank';

@NgModule({
  declarations: [
    BankModal,
  ],
  imports: [
    IonicPageModule.forChild(BankModal)
  ]
})
export class BankModalModule {}
