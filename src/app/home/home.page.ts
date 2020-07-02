import { Component } from '@angular/core';
import { DiagnosticService } from '../services/diagnostic.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AppAvailabilityService } from '../services/app-availability.service';
import {  HardwareSoftwareAvailability } from '../interface/hardware.interface';
import { FirebaseService } from '../services/firebase.service';
import { CoronaStatisticsService } from '../services/corona-statistics.service';
import { ReturnToOfficePage } from '../modals/return-to-office/return-to-office.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

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
    private statisticService: CoronaStatisticsService,
    private  menuCtrl: MenuController,
    private storage: Storage,
    public modalController: ModalController) {
      this.menuCtrl.enable(true);
  }

  cardTitles = ['Confirmed Cases','Active Cases','Recovered Cases', 'Deceased Cases'];
  userName:string;


  async ionViewWillEnter() {
    this.storage.get('userData').then((val) => {
      this.userData = val;
      console.log('userData', this.userData);
      this.userName = this.userData.name
    });
     await this.statisticService.getData().subscribe( res => {
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
            const value = res[key];
            this.statisticsData.push(value.value);
        }
    }
    this.statisticsData.splice(1,0,this.statisticsData[0] - this.statisticsData[1]);
    });
    this.hardwareSoftwareAvailability.bluetoothStatus =  await  this.diagnostic.checkBluetoothAvailability();
    this.hardwareSoftwareAvailability.locationStatus = await this.diagnostic.checkGPSAvailability();

    this.hardwareSoftwareAvailability.appAvailability = await this.appAvailable.onCheckAppAvailability();
    const hardwareSoftwareAvailability :HardwareSoftwareAvailability = {
      appAvailability: this.hardwareSoftwareAvailability.appAvailability,
      bluetoothStatus: this.hardwareSoftwareAvailability.bluetoothStatus,
      locationStatus:this.hardwareSoftwareAvailability.locationStatus
    }
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log(dateTime)
    this.firebaseService.updateUserHardware(this.userData.id,hardwareSoftwareAvailability,dateTime);
  }

  openPlayStore() {
    this.market.open('nic.goi.aarogyasetu');
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async openWeekModal() {
    const modal = await this.modalController.create({
      component: ReturnToOfficePage,
    });
    return await modal.present();
    }

}