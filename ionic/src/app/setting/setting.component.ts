import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api/api.service';
import { HrSystem, connectHrSystem } from "../components/model/user"
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  accessKeyForm: FormGroup;
  isHRStystem: boolean;
  errorMessage: string;
  connectHrSystem: connectHrSystem;
  constructor(
    public apiServices: ApiService,
    private nativeStorage: NativeStorage,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.accessKeyGenrate();
    this.userData();
  }
  accessKeyGenrate() {
    this.accessKeyForm = new FormGroup({
      secretuserData_key: new FormControl("", [
        Validators.required
      ]),
    });
  }

  isHRSystem() {
    this.isHRStystem = true;
  }

  async userData() {
    try {
      const data = await this.apiServices.getUserMeta();
      this.connectHrSystem = data['meta'].key
      this.isHRSystem();
    }
    catch (e) {
      this.errorMessage = e
    }
  }
  async connectHr(formData: HrSystem) {
    try {
      await this.apiServices.connectHR(formData);
      await this.apiServices.successconnectHR({ key: formData.secret_key });
      this.accessKeyForm.reset
    }
    catch (e) {
      this.errorMessage = e
    }
  }
}
