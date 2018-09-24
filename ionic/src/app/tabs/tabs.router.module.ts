import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { switchPage } from '../switch/switch.page';
import { AutomationPage } from '../automation/automation.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full'
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'switch',
        outlet: 'switch',
        component: switchPage
      },
      {
        path: 'automation',
        outlet: 'automation',
        component:AutomationPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
