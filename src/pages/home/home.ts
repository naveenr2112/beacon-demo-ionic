import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public enabledData;
  public scanResult;
  public result;

  constructor(public navCtrl: NavController, public spinner: SpinnerDialog, private ble: BLE) {

  }

  scan() {
    this.spinner.show();
    this.ble.isEnabled().then(data => { this.enabledData = 'Now Scanning..';this.scanBeacons();}).catch(err => { this.enabledData = err;this.spinner.hide();})
  }

  scanBeacons() {
    this.ble.startScan([]).subscribe(data => {
      this.scanResult = data; this.result = JSON.stringify(data);this.spinner.hide();
    }, err => { this.enabledData = err; this.spinner.hide(); });

    setTimeout(()=> {
      this.ble.stopScan().then(data => this.enabledData = data);
      this.spinner.hide();
    },15000);
  }
}
