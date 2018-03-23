import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { MemberCenterPage } from '../member-center/member.center';
import { HomeService } from '../../service/HomeService';
import { GlobalService } from '../../service/global-service';
import { ToastService } from '../../service/toast.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'Page-ModifyPwConfirm',
  templateUrl: 'modify.pw.confirm.html'
})
export class ModifyPwConfirm {

  private modifyconfirm:any;

  constructor(public navCtrl: NavController,
                          fb: FormBuilder,
              private gs:GlobalService,
              private homeService:HomeService,
              private toastService:ToastService) {
    this.modifyconfirm = fb.group({
      newpassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  //修改密码
  modifyconfirmHandler(value?: any){

    if(value.password == value.confirmPassword){
      let _pw = Md5.hashStr(value.password);
      let obj = {
        'username':this.gs.get('username'),
        'password':_pw
      }
      this.homeService.modifyPwService(obj).then((res)=>{
        if(res['code'] == '0'){
          this.toastService.presentToast('修改密码失败！','bottom');
        }

        if(res['code'] == '1'){
          this.toastService.presentToast('密码修改成功！','bottom');
          this.navCtrl.push(MemberCenterPage);
        }

        if(res['code'] == '2'){
          this.toastService.presentToast('用户名错误！','bottom');
        }
      })
    }else{
      this.toastService.presentToast('两次密码不一致！','bottom');
    }

  }

  //返回到登录页面
  backSignIn(){
    this.navCtrl.pop();
  }

}
