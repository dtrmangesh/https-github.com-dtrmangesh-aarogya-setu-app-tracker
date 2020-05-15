import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(private diagnostic: Diagnostic) { }

  async checkGPSAvailability() {
    let checkGPSService;
  await  this.diagnostic.isGpsLocationAvailable().then((state) => {
      checkGPSService = true;
  }).catch(e => console.log(e));
    if (checkGPSService !== true) {
      checkGPSService= false
    }
    return checkGPSService;
  }

  async checkBluetoothAvailability()  {
    let checkBluetooth;
   await this.diagnostic.getBluetoothState()
     .then((state) => {
       if (state === this.diagnostic.bluetoothState.POWERED_ON) {
        checkBluetooth = true
       } else {
         checkBluetooth = false
        }
      }).catch(e => console.error(e));
    return checkBluetooth;
  }
}

