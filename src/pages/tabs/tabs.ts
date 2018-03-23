import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TaskListPage } from '../task-list/task.list';
import { MyBenefitPage } from '../my-benefit/my.benefit';
import { MemberCenterPage } from '../member-center/member.center';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TaskListPage;
  tab3Root = MyBenefitPage;
  tab4Root = MemberCenterPage;

  constructor() {

  }
}
