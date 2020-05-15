import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppAvailabilityService {
app;
constructor(private appAvailability: AppAvailability, private platform: Platform) {
}

async onCheckAppAvailability() {
  let isAppAvailable;

  if (this.platform.is('ios')) {
    this.app = 'aarogyasetu://';
  } else if (this.platform.is('android')) {
    this.app = 'nic.goi.aarogyasetu';
  }
  await this.appAvailability.check(this.app)
  .then(
    (yes: boolean) => {
      console.log(this.app + ' is available');
      isAppAvailable = true;
    },
    (no: boolean) => {
      console.log(this.app + ' is NOT available');
      isAppAvailable = false;
    }
  );
  return isAppAvailable;
  }
}
