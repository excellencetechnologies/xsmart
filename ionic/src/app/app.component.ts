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
    // localStorage.setItem('live', JSON.stringify(this.live));

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async deviceId() {
    if (this.pltform.is('cordova')) {
      try {
        const deviceId = await this.deviceServices.getAppID();
        this.nativeStorage.setItem('id', deviceId)
        localStorage.getItem("userID")
      } catch (err) {
        this.errorMessage = err.message;
      }
    }
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
