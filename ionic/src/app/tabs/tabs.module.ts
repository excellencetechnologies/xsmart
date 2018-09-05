import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { AboutPageModule } from '../about/about.module';
import { HomePageModule } from '../home/home.module';
// import { PairDevicesComponent } from '../pair-devices/pair-devices.component';
// import { AddDevicesComponent } from '../add-devices/add-devices.component';
// import { ScanDevicesComponent } from '../scan-devices/scan-devices.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AboutPageModule,
    ContactPageModule,
    // PairDevicesComponent,
    // AddDevicesComponent,
    // ScanDevicesComponent
   
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
