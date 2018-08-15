import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class NotifyService {
    constructor(
        private alertController: AlertController,
        private platform: Platform) {
    }

    async alertUser(msg: string, subtitle: string = "") {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: subtitle,
            message: msg
        });

        await alert.present();

        setTimeout(() => {
            alert.dismiss();
        }, 1000)
    }

}