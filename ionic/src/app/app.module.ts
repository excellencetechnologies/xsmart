import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeviceComponent } from './device/device.component';
import { ScanDevicesComponent } from './scan-devices/scan-devices.component';
import { PairDevicesComponent } from './pair-devices/pair-devices.component';
import { AddDevicesComponent } from './add-devices/add-devices.component';

@NgModule({
  declarations: [AppComponent,LoginComponent, RegisterComponent, DeviceComponent, ScanDevicesComponent, PairDevicesComponent, AddDevicesComponent],
  entryComponents: [],
  imports: [BrowserModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule,
     IonicModule.forRoot(),
     AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    UniqueDeviceID,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
