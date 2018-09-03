import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScanDevicesComponent } from './scan-devices/scan-devices.component';
import { PairDevicesComponent } from './pair-devices/pair-devices.component';
import { AddDevicesComponent } from './add-devices/add-devices.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login",component: LoginComponent },
  { path: "register",component: RegisterComponent},
  { path: "scanDevices",component:ScanDevicesComponent},
  { path: "pairDevices",component:PairDevicesComponent},
  { path: "addDevices",component:AddDevicesComponent},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
