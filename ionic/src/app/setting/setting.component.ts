import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api/api.service';
import { ValidateHRSystemKey, } from "../components/model/user"
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingAccessKeyForm: FormGroup;
  isHRStystem: boolean;
  errorMessage: string;
  accessKey: string;
  constructor(
    public apiServices: ApiService,
    private nativeStorage: NativeStorage,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.addAccessKey();
    this.getUserMetaData();
  }
  addAccessKey() {
    this.settingAccessKeyForm = new FormGroup({
      secret_key: new FormControl("", [
        Validators.required
      ]),
    });
  }

  isHRSystem() {
    this.isHRStystem = true;
  }

  async getUserMetaData() {
    try {
      const data = await this.apiServices.getUserMetaData();
      this.accessKey = data['meta'].key
      if (this.accessKey) {
        this.isHRSystem();
      }
    }
    catch (e) {
      this.errorMessage = e
    }
  }
  async connectHrThroughAccessKey(formData: ValidateHRSystemKey) {
    try {
      await this.apiServices.connectSettingToHRSystem(formData);
      await this.apiServices.addUserMetaData({ key: formData.secret_key });
      this.settingAccessKeyForm.reset();
    }
    catch (e) {
      this.errorMessage = e
    }
  }
}
