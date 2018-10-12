import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './api/api.service';
import { DeviceService } from './api/device.service';
import { ExistingDevicesComponent } from './existing-devices/existing-devices.component';
import { SlidesComponent } from './slides/slides.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpModule } from '@angular/http';
import { ScanDeviceComponent } from './scan-device/scan-device.component';
import { PairDeviceComponent } from './pair-device/pair-device.component';
import { SetWifiPasswordComponent } from './set-wifi-password/set-wifi-password.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { SettingComponent } from './setting/setting.component';
import { AddDevicesComponent } from './add-devices/add-devices.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { WifiNetworkComponent } from './wifi-network/wifi-network.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExistingDevicesComponent,
    SlidesComponent,
    ProfileComponent,
    ScanDeviceComponent,
    PairDeviceComponent,
    SetWifiPasswordComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    SettingComponent,
    AddDevicesComponent,
    WifiNetworkComponent,
  ],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 60,
      space: -10,
      outerStrokeWidth: 10,
      innerStrokeWidth: 8,
      outerStrokeColor: "#488aff",
      innerStrokeColor: "#f5f5f5",
      animationDuration: 100,
    })
    ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    UniqueDeviceID,
    AuthGuard,
    File,
    FileTransfer,
    Camera,
    FileTransferObject,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}