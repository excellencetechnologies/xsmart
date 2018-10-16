import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavController, LoadingController, Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { EventHandlerService } from '../api/event-handler.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ngOnInit() {
  }
  imageBase64: string;
  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private _event: EventHandlerService
  ) {

    if (localStorage.getItem('profile')) {
      this.imageBase64 = localStorage.getItem('profile');
    }

  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.imageBase64 = "data:image/jpeg;base64," + imageData;
      localStorage.setItem('profile', this.imageBase64);
      this._event.setUserImageEvent('uploaded')
    }, (err) => {
      console.log(err);
    });
  }
  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageBase64 = 'data:image/jpeg;base64,' + imageData;
      localStorage.setItem('profile', this.imageBase64);
      this._event.setUserImageEvent('uploaded')
    }, (err) => {
      console.log(err);
    })
  }



}




