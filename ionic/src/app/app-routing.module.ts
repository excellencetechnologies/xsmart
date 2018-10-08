import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExistingDevicesComponent } from './existing-devices/existing-devices.component';
import { SlidesComponent } from './slides/slides.component';
import { AuthGuard } from "./auth.guard";
import { ProfileComponent } from './profile/profile.component';
import { ScanDeviceComponent } from './scan-device/scan-device.component';
import { PairDeviceComponent } from './pair-device/pair-device.component';
import { SetWifiPasswordComponent } from './set-wifi-password/set-wifi-password.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { SettingComponent } from './setting/setting.component';
import { AddDevicesComponent } from './add-devices/add-devices.component';
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", canActivate: [AuthGuard],component: LoginComponent },
  { path: "register",component: RegisterComponent},
  { path: "existing-devices", canActivate: [AuthGuard],component:ExistingDevicesComponent},
  { path: "slides", canActivate: [AuthGuard],component:SlidesComponent},
  { path: "profile",canActivate: [AuthGuard],component:ProfileComponent},
  { path: "scan-device", canActivate:[AuthGuard],component:ScanDeviceComponent}, 
  { path: "pair-device",canActivate:[AuthGuard],component:PairDeviceComponent},
  { path: "set-Wifi-Password", canActivate:[AuthGuard],component:SetWifiPasswordComponent},
  { path :"add-employee/:id",canActivate:[AuthGuard],component:AddEmployeeComponent},
  { path :"view-employee",canActivate:[AuthGuard],component:ViewEmployeeComponent},
  { path:"setting",canActivate:[AuthGuard],component:SettingComponent},
  { path:"add-devices",canActivate:[AuthGuard],component:AddDevicesComponent},
  { path: '',canActivate: [AuthGuard], loadChildren: './tabs/tabs.module#TabsPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
