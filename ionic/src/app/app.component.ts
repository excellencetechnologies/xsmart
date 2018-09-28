import { Component, OnDestroy } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, PopoverController, ActionSheetController, ModalController } from '@ionic/angular';
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
  loginSubscription: any;
  userSubscription: any;
  errorMessage: string;
  name: string;
  devices: string;
  image: string;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public deviceServices: DeviceService,
    public pltform: Platform,
    private nativeStorage: NativeStorage,
    private menuControler: MenuController,
    private router: Router,
    private _event: EventHandlerService,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    // private toast: Toast
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
    localStorage.removeItem('token')
    localStorage.removeItem('username')
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
  // ************************backButton************************************
  // backButtonEvent() {
  //   this.platform.backButton.subscribe(async () => {
  //     // close action sheet
  //     try {
  //       const element = await this.actionSheetCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {
  //     }

  //     // close popover
  //     try {
  //       const element = await this.popoverCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {
  //     }

  //     // close modal
  //     try {
  //       const element = await this.modalCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);

  //     }

  //     // close side menua
  //     try {
  //       const element = await this.menu.getOpen();
  //       if (element !== null) {
  //         this.menu.close();
  //         return;

  //       }

  //     } catch (error) {

  //     }

  //     this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //       if (outlet && outlet.canGoBack()) {
  //         outlet.pop();

  //       } else if (this.router.url === '/tabs') {
  //         if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
  //           // this.platform.exitApp(); // Exit from app
  //           navigator['app'].exitApp(); // work in ionic 4

  //           } else {
  //             // this.toast.show(
  //             //   `Press back again to exit App.`,
  //             //   '2000',
  //             //   'center')
  //             //   .subscribe(toast => {
  //             //     // console.log(JSON.stringify(toast));
  //             //   });
  //           this.lastTimeBackPress = new Date().getTime();
  //         }
  //       }
  //     });
  //   });
  // }
}
