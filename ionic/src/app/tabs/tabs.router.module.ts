import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { switchPage } from '../switch/switch.page';
import { AutomationPage } from '../automation/automation.page';
// import { ScanDeviceComponent } from '../scan-device/scan-device.component';
// import { PairDeviceComponent } from '../pair-device/pair-device.component';
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
        path: 'switch',
        outlet: 'switch',
        component: switchPage
      },
      {
        path: 'automation',
        outlet: 'automation',
        component:AutomationPage
      }
      // {
      //   path: 'scan-device',
      //   outlet: 'scan-device',
      //   component:ScanDeviceComponent
      // },
      // {
      //   path: 'pair-device',
      //   outlet: 'pair-device',
      //   component:PairDeviceComponent
      // },
      // {
      //   path: 'add-device',
      //   outlet: 'add-device',
      //   component:AddDevicesComponent
      // },
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
