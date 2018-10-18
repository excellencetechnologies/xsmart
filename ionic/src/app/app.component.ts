import { Component, OnDestroy } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, IonRouterOutlet, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './api/device.service';
import { MenuController } from '@ionic/angular'
import { Router } from "@angular/router";
import { EventHandlerService } from './api/event-handler.service';
import { ViewChildren, QueryList } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  @ViewChildren(IonRouterOutlet) routerOutlets: any;
  loginSubscription: any;
  userSubscription: any;
  errorMessage: string;
  name: string;
  devices: string;
  image: string;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  pressBackButton = false;
  generate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public deviceServices: DeviceService,
    public pltform: Platform,
    private nativeStorage: NativeStorage,
    private menuControler: MenuController,
    private router: Router,
    public modalCtrl: ModalController,
    private _event: EventHandlerService,
    private device: Device
  ) {
    this.initializeApp();
    this.deviceId();
    this.menuControler.enable(true);
    if (localStorage.getItem('username')) {
      this.name = localStorage.getItem('username');
    }
    this.loginSubscription = this._event.loginData.subscribe((res) => {
      this.name = res;
    })
    this.devices = localStorage.getItem('devices');
    if (this.devices) {
      this.devices = JSON.parse(this.devices).length;
    }
    if (localStorage.getItem('profile')) {
      this.image = localStorage.getItem('profile');
    }
    this.userSubscription = this._event.userImage.subscribe((res) => {
      this.image = localStorage.getItem('profile');
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async deviceId() {
    if (this.platform.is('cordova')) {
      const unquieID=this.device.uuid
      this.nativeStorage.setItem('unquieID',unquieID)
      this._event.deviceUUid(this.device.uuid);
    }
    else {
      this.genrateUniqueID()
    }

  }
  genrateUniqueID() {
    this.generate = function (min = 1, max = 1000) {
      this.number = Math.floor(Math.random() * (max - min + 1)) + min;
      localStorage.setItem("unquieID", this.number);
    }
    this.generate();
  }

  logout() {
    this.router.navigate(["/login"])
    localStorage.clear();
    this.name = null;
    this.menuControler.toggle()
  }
  profile() {
    this.router.navigate(["/profile"])
    this.menuControler.toggle()
  }
  setting() {
    this.router.navigate(["/setting"])
    this.menuControler.toggle()
  }
  ngOnDestroy() {
    this.loginSubscription.unsubscribe()
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        this.errorMessage = error;
      }
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }
        else {
          if (!this.pressBackButton) {
            this.pressBackButton = true;
            setTimeout(() => this.pressBackButton = false, 2000);
            return;
          } else {
            navigator['app'].exitApp();
          }
        }
      }
      );
    });
  }
}
