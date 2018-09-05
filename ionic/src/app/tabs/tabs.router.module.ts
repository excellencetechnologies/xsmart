import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ContactPage } from '../contact/contact.page';
// import { PairDevicesComponent } from '../pair-devices/pair-devices.component';
// import { ScanDevicesComponent } from '../scan-devices/scan-devices.component';
// import { AddDevicesComponent } from '../add-devices/add-devices.component';

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
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      // {
      //   path: 'about',
      //   redirectTo: '/tabs/(about:about)',
      //   component: AboutPage,
      //   children: [
      //     {
      //       path: 'pairDevices',
      //       outlet: 'pairDevices',
      //       component: PairDevicesComponent
      //     },
      //     {
      //       path: 'scanDevices',
      //       outlet: 'ScanDevices',
      //       component: ScanDevicesComponent
      //     },
      //     {
      //       path: 'addDevices',
      //       outlet: 'addDevices',
      //       component: AddDevicesComponent
      //     }
      //   ]
      // },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage
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
