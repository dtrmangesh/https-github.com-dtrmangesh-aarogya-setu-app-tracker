import { Component } from '@angular/core';
import { DiagnosticService } from '../services/diagnostic.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
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
  public config = {
    animation: 'count',
    format: 'd',
    theme: 'minima',
    value: 0,
    auto: true,
  }
  hardwareSoftwareAvailability: HardwareSoftwareAvailability = {
    appAvailability: false,
    locationStatus: false,
    bluetoothStatus:false
  };
  userData: any;
  constructor(private diagnostic: DiagnosticService,
    private readonly router: Router,
    private market: Market,
    private appAvailable: AppAvailabilityService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private statisticService: CoronaStatisticsService) {
  }

  cardTitles = ['Confirmed Cases','Active Cases','Recovered Cases', 'Deaths'];
  userName:string;


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
    this.statisticsData.splice(1,0,this.statisticsData[0] - this.statisticsData[1]);
    console.log('>>>>>>>>>>>>>>>>>>>>>',this.statisticsData);


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

  openPlayStore() {
    this.market.open('nic.goi.aarogyasetu');
  }
}