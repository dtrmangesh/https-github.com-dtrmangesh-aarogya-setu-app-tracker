import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { 
    
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
}
