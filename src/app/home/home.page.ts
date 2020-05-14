import { Component } from '@angular/core';
import { DiagnosticService } from '../services/diagnostic.service';
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

  hardwareAvailiability: DeviceHardware = {
    isBletoothTurnOn: false,
    isGPSOn:false
  };
  constructor(private diagnostic: DiagnosticService) {
  }
  async ionViewWillEnter() {
    this.hardwareAvailiability.isBletoothTurnOn =  await  this.diagnostic.checkBluetoothAvailability();
    console.log("bluetooth",this.hardwareAvailiability.isBletoothTurnOn);
    this.hardwareAvailiability.isGPSOn = await this.diagnostic.checkGPSAvailability();
    console.log("GPS",this.hardwareAvailiability.isGPSOn);
  }

}
