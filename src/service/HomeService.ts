/**
 * Created by lichun on 2017/12/19.
 */
import { Injectable } from "@angular/core";
import { HttpService } from "./HttpService";
import { APP_SERVER_URL,API } from '../providers/Constants';
@Injectable()
export class HomeService {
  constructor(private httpService:HttpService){

  }

  //注册
  signUpService(value){
    return this.httpService.post(APP_SERVER_URL+API.signUpServer,value);
  }

  //登录
  signInService(value){
    //console.log('signIn==>',value)
    return this.httpService.post(APP_SERVER_URL+API.signInServer,value);
  }

  //获取会员信息
  userInfoService(_username){
    return this.httpService.post(APP_SERVER_URL+API.userInfoServer,{'username':_username,randomNum:Math.random()});
  }

  //找回密码
  forgotpwService(value){
    //console.log('homeservers',value);
    return this.httpService.post(APP_SERVER_URL+API.forgotPwServer,value);
  }

  //发送短信验证码
  smsVerificationService(value){
    return this.httpService.post(APP_SERVER_URL+API.sendSmsServer,value);
  }

  //获取首页任务列表
  taskListIndexService(){
    return this.httpService.get(APP_SERVER_URL+API.taskListServer,{isIndex:1,randomNum:Math.random()});
  }

  //获取任务列表
  taskListService(params){
    return this.httpService.get(APP_SERVER_URL+API.taskListServer,{isIndex:0,isType:params._isType,isOrde:params._isOrde,randomNum:Math.random()});
  }

  //获取平台列表
  taskplatformService(){
    return this.httpService.get(APP_SERVER_URL+API.taskplatformServer,{randomNum:Math.random()});
  }

  //获取地区数据
  regionService(){
    return this.httpService.get(APP_SERVER_URL+API.regionServer,{randomNum:Math.random()});
  }

  //获取行业数据
  tradeService(){
    return this.httpService.get(APP_SERVER_URL+API.tradeServer,{randomNum:Math.random()});
  }

  //获取兴趣爱好数据
  hobbyService(){
    return this.httpService.get(APP_SERVER_URL+API.hobbyServer,{randomNum:Math.random()});
  }

  //修改个人信息
  updateUserInfoService(value){
    return this.httpService.post(APP_SERVER_URL+API.updateUserInfoServer,value);
  }

  //确认旧密码是否正确
  invOldPwService(value){
    return this.httpService.post(APP_SERVER_URL+API.invOldPwServer,value);
  }

  //修改密码
  modifyPwService(value){
    return this.httpService.post(APP_SERVER_URL+API.modifyPwServer,value);
  }

  //接收任务
  worksService(value){
    return this.httpService.post(APP_SERVER_URL+API.worksServer,value);
  }

  //我的任务
  myTaskService(value){
    return this.httpService.post(APP_SERVER_URL+API.myTaskServer,value);
  }

  //我的收益
  myBenefitService(value){
    return this.httpService.post(APP_SERVER_URL+API.myBenefitServer,value);
  }

  //我的下级收益
  myLevService(value){
    return this.httpService.post(APP_SERVER_URL+API.myLevServer,value);
  }

  //收益排行
  rankServer(){
    return this.httpService.post(APP_SERVER_URL+API.rankingServer,{randomNum:Math.random()});
  }

  //下级享客
  sharkerService(value){
    return this.httpService.post(APP_SERVER_URL+API.sharkerServer,value);
  }

  //获取银行数据
  bankService(){
    return this.httpService.post(APP_SERVER_URL+API.banksServer,{randomNum:Math.random()});
  }

  //更新会员银行数据
  upDateBankService(value){
    return this.httpService.post(APP_SERVER_URL+API.bankDataServer,value);
  }

  //保存支付宝账号数据
  alipayService(value){
    return this.httpService.post(APP_SERVER_URL+API.alipayServer,value);
  }

  //保存微信账号数据
  weChatService(value){
    return this.httpService.post(APP_SERVER_URL+API.weChatServer,value);
  }

  //保存提现数据
  tixianService(value){
    return this.httpService.post(APP_SERVER_URL+API.tixianServer,value);
  }

  //获取轮播图数据
  getLunboService(){
    return this.httpService.post(APP_SERVER_URL+API.getLunboServer,{randomNum:Math.random()});
  }

  //获取总发放奖金数据
  getTotalService(){
    return this.httpService.post(APP_SERVER_URL+API.getTotalServer,{randomNum:Math.random()});
  }

  //获取帮助信息数据
  getHelpService(){
    return this.httpService.post(APP_SERVER_URL+API.getHelpServer,{randomNum:Math.random()});
  }

  //获取系统消息数据
  getNoticeService(_invitation){
    return this.httpService.post(APP_SERVER_URL+API.getNoticeServer,{invitation:_invitation,randomNum:Math.random()});
  }

  //设置系统消息已读状态
  setNoticeService(_idstr,_invitation){
    return this.httpService.post(APP_SERVER_URL+API.setNoticeState,{idstr:_idstr,invitation:_invitation,randomNum:Math.random()});
  }

  //保存问题反馈数据
  saveFeedService(_obj){
    return this.httpService.post(APP_SERVER_URL+API.feedServer,_obj);
  }

  //保存问题反馈数据
  mytaskupdateService(_obj){
    return this.httpService.post(APP_SERVER_URL+API.mytaskupdateServer,_obj);
  }

  //保存微信
  saveWebChatService(_obj){
    return this.httpService.post(APP_SERVER_URL+API.saveWebChatServer,_obj);
  }

  //保存微博
  saveWeiboService(_obj){
    return this.httpService.post(APP_SERVER_URL+API.saveWeiboServer,_obj);
  }

  //保存头条
  saveToutiaoService(_obj){
    return this.httpService.post(APP_SERVER_URL+API.saveToutiaoServer,_obj);
  }

  //保存头像
  saveAvatrService(_obj){
    return this.httpService.post(APP_SERVER_URL+API.avatrServer,_obj);
  }

  //获取提现数据
  txListService(){
    return this.httpService.post(APP_SERVER_URL+API.tixianlistServer,{randomNum:Math.random()});
  }


}
