import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {map,take}from 'rxjs/operators'
import { Observable } from 'rxjs';
import { async } from 'q';
import {HardwareSoftwareAvailability} from '../interface/hardware.interface'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collection: AngularFirestoreCollection;
  constructor(private firestore: AngularFirestore,public afDatabase: AngularFireDatabase) {
    this.collection = this.firestore.collection('userInfo');
  }
  createEmployeeData(): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`userInfo/${id}`).set({
      appAvailability:false,
      bluetoothStatus:true,
      contactNo:7448163113,
      devicePlatform:
      'android',
      email:
      'mdatar@gmail.com',
      employeeId:
      'MOBPUN-98',
      locationStatus:
      false,
      name:
        'mangesh',
      id:id
    });
  }
  readDatabse() {
    return this.firestore.collection('userInfo');
  }
  readSingleDatabse(id: string): Observable<any> {
    return this.collection.doc(id).valueChanges().pipe(
      take(1),
      map((note:any) => {
        note.id = id;
        console.log(note);
        return note;
      })
    )
  }
async getUser(userName) {

    let userData;
    const userCollection =  this.firestore.collection('userInfo').valueChanges();

    userCollection.subscribe( async (res: any) => {
         res.forEach(element => {
        if (element.name === userName) {
          console.log(element);
          userData = element;
        }
       });
    })
    return userData;
  }
  updateUserHardware(userId, userHardware:HardwareSoftwareAvailability,lastSeenUser): Promise<any> {
    return this.collection.doc(userId).update({
      appAvailability: userHardware.appAvailability,
      bluetoothStatus: userHardware.bluetoothStatus,
      locationStatus: userHardware.locationStatus,
      lastSeen:lastSeenUser
    })
  }

  updateUserPassword(id, newPassword): Promise<any> {
    return this.collection.doc(id).update({
      password: newPassword
    })}
}
