import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExistingDevicesComponent } from './existing-devices/existing-devices.component';
import { SlidesComponent } from './slides/slides.component';
import { AuthGuard } from "./auth.guard";
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", canActivate: [AuthGuard],component: LoginComponent },
  { path: "register",component: RegisterComponent},
  { path: "existing-devices", canActivate: [AuthGuard],component:ExistingDevicesComponent},
  { path: "slides", canActivate: [AuthGuard],component:SlidesComponent},
  { path: "profile",canActivate: [AuthGuard],component:ProfileComponent},
  { path: '',canActivate: [AuthGuard], loadChildren: './tabs/tabs.module#TabsPageModule' },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
