import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { AutomationPageModule } from '../automation/automation.module';
import { switchPageModule } from '../switch/switch.module';
import { HomePageModule } from '../home/home.module';
// import { ScanDeviceComponent } from '../scan-device/scan-device.component';
// import { PairDeviceComponent } from '../pair-device/pair-device.component';
// import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    switchPageModule,
    AutomationPageModule,
    // ScanDeviceComponent,
    // PairDeviceComponent,
    // AddEmployeeComponent 
   
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
