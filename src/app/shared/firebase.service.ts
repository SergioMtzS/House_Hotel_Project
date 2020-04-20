import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  initializeApp(firebase: { apiKey: string; authDomain: string; databaseURL: string; projectId: string; storageBucket: string; messagingSenderId: string; }) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

 

}
