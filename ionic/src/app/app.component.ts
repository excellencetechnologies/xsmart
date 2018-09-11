import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './api/device.service';
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  errorMessage: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public deviceServices: DeviceService,
    public pltform: Platform,
    private nativeStorage: NativeStorage,
    private menuControler:MenuController
  ) {
    this.initializeApp();
    this.deviceId();
    this.menuControler.enable(true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async deviceId() {
    if (this.pltform.is('cordova')) {
      try {
        const deviceId = await this.deviceServices.getAppID();
        this.nativeStorage.setItem('id', deviceId)
      } catch (err) {
        this.errorMessage = err.message;
      }
    }
  }
}
