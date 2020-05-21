import { Component } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { DiagnosticService } from '../services/diagnostic.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AppAvailabilityService } from '../services/app-availability.service';
import {  HardwareSoftwareAvailability } from '../interface/hardware.interface';
import { FirebaseService } from '../services/firebase.service';
import { CoronaStatisticsService } from '../services/corona-statistics.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAppInstalled: any;
  statisticsData =[];
  hardwareSoftwareAvailability: HardwareSoftwareAvailability = {
    appAvailability: false,
    locationStatus: false,
    bluetoothStatus:false
  };
  userData: any;
  constructor(private diagnostic: DiagnosticService,
    private readonly router: Router,
    private openNativeSettings: OpenNativeSettings,
    private appAvailable: AppAvailabilityService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private statisticService: CoronaStatisticsService) {
  }

  cardTitles = ['Confirmed cases', 'Recovered cases', 'Deceased cases'];
  sliderImages= ['assets/images/cover_mouth_sneeze.png',
  'assets/images/wash_hands_2.png',
  'assets/images/social_distance.png',
  'assets/images/stay_home.png']
  userName:string;

  sliderOpts = {
    autoplay: true,
    zoom: {
      maxRatio: 5
    }
  };

  async ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.userData) {
        this.userData = JSON.parse(params.userData);
        this.userName = this.userData.name
      }
    });
     await this.statisticService.getData().subscribe( res => {
      console.log('@@@@@@@@@@@@@', res);
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
            const value = res[key];
            this.statisticsData.push(value.value);
        }
    }

    });
    this.hardwareSoftwareAvailability.bluetoothStatus =  await  this.diagnostic.checkBluetoothAvailability();
    this.hardwareSoftwareAvailability.locationStatus = await this.diagnostic.checkGPSAvailability();

    this.hardwareSoftwareAvailability.appAvailability = await this.appAvailable.onCheckAppAvailability();
    const hardwareSoftwareAvailability :HardwareSoftwareAvailability = {
      appAvailability: this.hardwareSoftwareAvailability.appAvailability,
      bluetoothStatus: this.hardwareSoftwareAvailability.bluetoothStatus,
      locationStatus:this.hardwareSoftwareAvailability.locationStatus
    }
    this.firebaseService.updateUserHardware(this.userData.id,hardwareSoftwareAvailability);
  }
  onLogout() {
    this.router.navigate(['/login']);
  }

  onManageSettings() {
    this.openNativeSettings.open('settings');
  }
}