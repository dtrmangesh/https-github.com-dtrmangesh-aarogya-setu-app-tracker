import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-return-to-office',
  templateUrl: './return-to-office.page.html',
  styleUrls: ['./return-to-office.page.scss'],
})
export class ReturnToOfficePage {
  counter = 0;
  cardData = []

  currentWeekData = [
    {
      day: 'Monday',
      month: 'July 1',
      seats: '60',
      spots: 'Spots left',
      selectedSeat: false
    },
    {
      day: 'Tuesday',
      month: 'July 2',
      seats: '50',
      spots: 'Spots left',
      selectedSeat: false
    },
    {
      day: 'Wednesday',
      month: 'July 3',
      seats: 'Full',
      spots: '',
      selectedSeat: false

    },
    {
      day: 'Thursday',
      month: 'July 4',
      seats: '60',
      spots: 'Spots left',
      selectedSeat: false
    },
    {
      day: 'Friday',
      month: 'July 4',
      seats: '60',
      spots: 'Spots left',
      selectedSeat: false
    },
    {
      day: 'Next Week',
      icon: 'arrow-forward-outline',
      nextWeek: true,
      selectedSeat: false
    },
  ]
  
  nextWeekData = [
    {
      day: 'Previous Week',
      icon: 'arrow-back-outline',
      previousWeek: true,
      selectedSeat: false
    },
    {
      day: 'Monday',
      month: 'July 7',
      seats: '60',
      spots: 'Spots left',
      selectedSeat: false

    },
    {
      day: 'Tuesday',
      month: 'July 8',
      seats: '40',
      spots: 'Spots left',
      selectedSeat: false
    },
    {
      day: 'Wednesday',
      month: 'July 9',
      seats: '58',
      spots: 'Spots left',
      selectedSeat: false
    },
    {
      day: 'Thursday',
      month: 'July 10',
      seats: 'Full',
      spots: '',
      selectedSeat: false
    },
    {
      day: 'Friday',
      month: 'July 11',
      seats: '60',
      spots: 'Spots left',
      selectedSeat: false
    },
  ]
  
  constructor(public modalController: ModalController,
    public alertController: AlertController) {}

  ionViewWillEnter() {
  this.cardData = this.currentWeekData;
  }

  cardTapped(day) {
    if(day ==='Next Week') {
      this.cardData = this.nextWeekData
      this.counter = 0;
    } else if( day === 'Previous Week'){
      this.cardData= this.currentWeekData
      this.counter = 0;
    }
    if(this.counter < 3) {
      this.cardData.forEach(result => {
        if(result.day === day) {
          result.selectedSeat = true;
        }
      })
      if(day !=='Next Week' && day !=='Previous Week'){
        this.counter++
      }
    } 
    else{
      this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: '',
        message: 'Can not selct more than 3 days.',
        buttons: ['OK']
      })
      .then(alert => {
        alert.present();
      });
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
