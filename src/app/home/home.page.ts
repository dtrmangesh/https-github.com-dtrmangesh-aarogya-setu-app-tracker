import { Component } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { DiagnosticService } from '../services/diagnostic.service';
import { Router } from '@angular/router';
import { AppAvailabilityService } from '../services/app-availability.service';
interface DeviceHardware {
  isBletoothTurnOn: boolean,
  isGPSOn:boolean
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAppInstalled: any;
  hardwareAvailiability: DeviceHardware = {
    isBletoothTurnOn: false,
    isGPSOn:false
  };
  constructor(private diagnostic: DiagnosticService,
    private readonly router: Router,
    private openNativeSettings: OpenNativeSettings,
    private appAvailable: AppAvailabilityService) {
  }

  cardTitles = ['Confirmed cases', 'Active cases', 'Recovered cases', 'Deceased cases'];
  sliderImages= ['assets/images/cover_mouth_sneeze.png',
  'assets/images/wash_hands_2.png',
  'assets/images/social_distance.png',
  'assets/images/stay_home.png']
  userName= 'Anjali';

  sliderOpts = {
    autoplay: true,
    zoom: {
      maxRatio: 5
    }
  };

  async ionViewWillEnter() {
    this.hardwareAvailiability.isBletoothTurnOn =  await  this.diagnostic.checkBluetoothAvailability();
    console.log('bluetooth',this.hardwareAvailiability.isBletoothTurnOn);
    this.hardwareAvailiability.isGPSOn = await this.diagnostic.checkGPSAvailability();
    console.log('GPS',this.hardwareAvailiability.isGPSOn);

    this.isAppInstalled = await this.appAvailable.onCheckAppAvailability();
    console.log('App Availability', this.isAppInstalled);

  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  onManageSettings() {
    this.openNativeSettings.open('settings');
  }
}