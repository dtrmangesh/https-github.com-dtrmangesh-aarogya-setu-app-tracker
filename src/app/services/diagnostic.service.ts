import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(private diagnostic: Diagnostic) { }

  async checkGPSAvailability() {
    let checkGPSService;
    this.diagnostic.requestLocationAuthorization();
    await this.diagnostic.isLocationAvailable().then(state => {
      if (state) {
        checkGPSService = true;
        console.log(state, "available")
      } else {
        checkGPSService= false
      }
    }).catch(e => console.log(e));
   
    return checkGPSService;
  }

  async checkBluetoothAvailability()  {
    let checkBluetooth;
    this.diagnostic.requestBluetoothAuthorization();
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

