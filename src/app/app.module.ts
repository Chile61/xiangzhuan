import { NgModule, ErrorHandler } from '@angular/core';

//跟模块
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//native模块
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

//一级组件
import { MemberCenterPage } from '../pages/member-center/member.center';
import { MyBenefitPage } from '../pages/my-benefit/my.benefit';
import { TaskListPage } from '../pages/task-list/task.list';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot.password';
import { SginUpPage } from '../pages/sign-up/sign.up';
import { SginInPage } from '../pages/sign-in/sign.in';
import { ModifyPwPage } from '../pages/modify-pw/modify.pw';
import { ModifyPwConfirm } from '../pages/modify-pw-confirm/modify.pw.confirm';

//二级组件
import { MemberCenterHelpPage } from '../pages/member-center-help/member.center.help';
import { MemberCenterShouyiPage } from '../pages/member-center-shouyi/member.center.shouyi';
import { MyBenefitRankingPage } from '../pages/my-benefit-ranking/my.benefit.ranking';
import { TaskListDetailsPage } from '../pages/task-list-details/task-list-details';
import { MemberCenterTixianPage } from '../pages/member-center-tixian/member.center.tixian';
import { MemberCenterFeedPage } from '../pages/member-center-feed/member.center.feed';
import { MemberCenterContactUsPage } from '../pages/member-center-contactus/member.center.contactus';
import { MemberCenterPlatformPage } from '../pages/member-center-platform/member.center.platform';
import { MemberCenterCodePage } from '../pages/member-center-code/member.center.code';
import { MemberCenterSharkerPage } from '../pages/member-center-sharker/member.center.sharker';

//三级组件
import { MemberCenterTixianManagePage } from '../pages/member-center-tixian-manage/member.center.tixian.manage';
import { MemberCenterTixianAlipayPage } from '../pages/member-center-tixian-alipay/member.center.tixian.alipay';
import { MemberCenterTixianWechatPage } from '../pages/member-center-tixian-wechat/member.center.tixian.wechat';
import { MemberCenterHelpDetails } from '../pages/member-center-help-details/member.center.help.details';
import { MemberCenterPlatformWechatPage } from '../pages/member-center-platform-wechat/member.center.platform.wechat';
import { MemberCenterPlatformWeiboPage } from '../pages/member-center-platform-weibo/member.center.platform.weibo';
import { MemberCenterPlatformToutiaoPage } from '../pages/member-center-platform-toutiao/member.center.platform.toutiao';
import { ForgotPasswordConfirm } from '../pages/forgot-password-confirm/forgot.password.confirm';

//模块
import { NickNameModalModule } from '../pages/ModalNickName/modal.nickname.module';
import { GenderModalModule } from '../pages/ModalGender/modal.gender.module';
import { AgeModalModule } from '../pages/ModalAge/modal.age.module';
import { RegionModalModule } from '../pages/ModalRegion/modal.region.module';
import { BankModalModule } from '../pages/ModalBank/modal.bank.module';
import { TradeModalModule } from '../pages/ModalTrade/modal.trade.module';
import { AvatarModalModule } from '../pages/ModalAvatar/modal.avatar.module';
import { NoticeModalModule } from '../pages/ModalNotice/modal.notice.module';
import { MemberCenterUserPageModule } from '../pages/member-center-user/member.center.user.module';
import { MemberCenterMessagePageModule } from '../pages/member-center-message/member.center.message.module';
import { MemberCenterMyTaskPageModule } from '../pages/member-center-mytask/member.center.mytask.module';
import { MyTaskModalModule } from '../pages/ModalMyTask/modal.my.task.module';
import { MemberCenterTixianBankPageModule } from '../pages/member-center-tixian-bank/member.center.tixian.bank.module';

import {ScreenOrientation} from "@ionic-native/screen-orientation";

//http服务
import { HttpService } from '../service/HttpService';
import { HomeService } from '../service/HomeService';

//服务注入
import { GlobalService } from '../service/global-service';
import { generateData } from '../service/generate.service';
import { ImgURLPipeInjectables } from '../util/imgURLPipe';
import { ToastService } from '../service/toast.service';
import { AuthService } from '../service/auth.service';
import { LoadingServer } from '../service/loading.server';
import { WechatService } from '../service/wechat.service';


@NgModule({
  declarations: [
    MyApp,
    MemberCenterPage,
    MyBenefitPage,
    TaskListPage,
    HomePage,
    TabsPage,
    ForgotPasswordPage,
    SginUpPage,
    SginInPage,
    ModifyPwPage,
    ModifyPwConfirm,

    TaskListDetailsPage,
    MyBenefitRankingPage,
    MemberCenterHelpPage,
    MemberCenterShouyiPage,
    MemberCenterFeedPage,
    MemberCenterContactUsPage,
    MemberCenterPlatformPage,
    MemberCenterCodePage,
    MemberCenterSharkerPage,
    MemberCenterTixianPage,

    MemberCenterTixianManagePage,
    MemberCenterTixianAlipayPage,
    MemberCenterTixianWechatPage,
    MemberCenterHelpDetails,
    MemberCenterPlatformWechatPage,
    MemberCenterPlatformWeiboPage,
    MemberCenterPlatformToutiaoPage,
    ForgotPasswordConfirm,

    ImgURLPipeInjectables

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
        backButtonText: '返回',
        iconMode: 'ios',
        mode:'ios',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        tabsPlacement: 'bottom',
        pageTransition: 'ios-transition'
      }
    ),
    NickNameModalModule,
    NoticeModalModule,
    GenderModalModule,
    AgeModalModule,
    RegionModalModule,
    BankModalModule,
    MyTaskModalModule,
    TradeModalModule,
    AvatarModalModule,
    MemberCenterUserPageModule,
    MemberCenterMessagePageModule,
    MemberCenterMyTaskPageModule,
    MemberCenterTixianBankPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MemberCenterPage,
    MyBenefitPage,
    TaskListPage,
    HomePage,
    TabsPage,
    ForgotPasswordPage,
    SginUpPage,
    SginInPage,
    ModifyPwPage,
    ModifyPwConfirm,

    TaskListDetailsPage,
    MyBenefitRankingPage,
    MemberCenterHelpPage,
    MemberCenterShouyiPage,
    MemberCenterFeedPage,
    MemberCenterContactUsPage,
    MemberCenterPlatformPage,
    MemberCenterCodePage,
    MemberCenterSharkerPage,
    MemberCenterTixianPage,

    MemberCenterTixianManagePage,
    MemberCenterTixianAlipayPage,
    MemberCenterTixianWechatPage,
    MemberCenterHelpDetails,
    MemberCenterPlatformWechatPage,
    MemberCenterPlatformWeiboPage,
    MemberCenterPlatformToutiaoPage,
    ForgotPasswordConfirm

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    GlobalService,
    generateData,
    HttpService,
    HomeService,
    ToastService,
    AuthService,
    LoadingServer,
    WechatService,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
