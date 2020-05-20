import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from '@angular/fire/database';
import {map,take}from "rxjs/operators"
import { Observable } from 'rxjs';
import { async } from 'q';
import {Hardware} from '../interface/hardware.interface'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collection: AngularFirestoreCollection;
  constructor(private firestore: AngularFirestore,public afDatabase: AngularFireDatabase) { 
    this.collection = this.firestore.collection('user');
  }
  pickEyeColor(){
  var data= this.afDatabase.list('/user/',

    ref => ref.orderByChild('name').equalTo("mangesh"));
  
    data.valueChanges().subscribe(
  
      (datas) => { console.log("datas", datas) }
    );

  

  }
  
  createSong(): Promise<void> {
    const id = this.firestore.createId();
  
    return this.firestore.doc(`user/${id}`).set({
      appAvailability:false,
      bluetoothStatus:true,
      contactNo:7448163113,
      devicePlatform:
      "android",
      email:
      "mdatar@gmail.com",
      employeeId:
      "MOBPUN-98",
      locationStatus:
      false,
      name:
        "mangesh",
      id:id
    });
  }
  readDatabse() {
    return this.firestore.collection('user');
  }
  readSingleDatabse(id: string): Observable<any> {
    debugger
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
    debugger
    var userData;
    var userCollection =  this.firestore.collection('user').valueChanges();
  
      userCollection.subscribe( async (res: any) => {
         res.forEach(element => {
        if (element.name == userName) {
          console.log(element);
          userData = element;
        }
       });
    })
    return userData;
  }
  updateUserHardware(userId, userHardware:Hardware): Promise<any> {
    
    return this.collection.doc(userId).update({
      appAvailability: userHardware.appAvailability,
      bluetoothStatus: userHardware.bluetoothStatus,
      locationStatus:userHardware.locationStatus
    })
  }
}
