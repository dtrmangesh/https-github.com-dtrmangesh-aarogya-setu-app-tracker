import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { WeekDatesService } from 'src/app/services/week-dates.service';

@Component({
  selector: 'app-return-to-office',
  templateUrl: './return-to-office.page.html',
  styleUrls: ['./return-to-office.page.scss'],
})
export class ReturnToOfficePage {
  counter = 0;
  cardData = []
  updatedCurrentWeekData = [];
  updatedNextWeekData = [];
  currentWeek;
  nextWeek;

  constructor(public modalController: ModalController,
    public alertController: AlertController,
    private readonly datesService: WeekDatesService) {}

   async ionViewWillEnter() {
   await this.datesService.getWeekDates().subscribe(dates =>{
     this.currentWeek = dates.currentWeekBookings;
     this.nextWeek = dates.nextWeekBookings;
     console.log('################', dates)
    this.setCurrentWeekData();
    this.setNextWeekData();
  });
  }

  setCurrentWeekData() {
    this.currentWeek.forEach(res =>{
    const updatedWeek = this.getFormattedWeekObject(res);
    this.updatedCurrentWeekData.push(updatedWeek)
    });
    this.updatedCurrentWeekData.push({
      date: '',
      day: 'Next Week',
      month: '',
      totalSeats: '',
      availableSeats: '',
      id:''
    })
    this.cardData = this.updatedCurrentWeekData;
  }

  setNextWeekData() {
    this.nextWeek.forEach(res =>{
      const updatedWeek = this.getFormattedWeekObject(res);
      this.updatedNextWeekData.push(updatedWeek)
    });
    this.updatedNextWeekData.push({
      date: '',
      day: 'Previous Week',
      month: '',
      availableSeats: '',
      id:''
    })
  }

  getFormattedWeekObject(res) {
    const formatedDate = res.id.split('-');
    const dt = this.getFormattedWeekDate(formatedDate[0], formatedDate[1], formatedDate[2]).toDateString();
    const tempDate = dt.split(' ');
    const updatedObj ={
      date: tempDate[2],
      day: tempDate[0],
      month: tempDate[1],
      totalSeats: res.numberOfSeats,
      availableSeats: res.numberOfSeats - res.totalBooked,
      id:res.id
    }
    return updatedObj;
  }

  getFormattedWeekDate(year, week, dayNumber) {
    const j1 = new Date(year, 0, 10, 12, 0, 0),
    j2 = new Date(year, 0, 4, 12, 0, 0),
    mon1 = j2.getTime() - j1.getDay() * 86400000;
    return new Date(mon1 + ((week - 1) * 7 + (dayNumber - 1)) * 86400000);
  }

  cardTapped(day) {
    if(day ==='Next Week') {
      this.cardData= this.updatedNextWeekData
      this.counter = 0;
    } else if( day === 'Previous Week'){
      this.cardData= this.updatedCurrentWeekData
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

