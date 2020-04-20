import { FirebaseService } from './../shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { async } from 'rxjs/internal/scheduler/async';
import {AngularFireStorage} from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import * as Firebase from 'firebase';
import { habService } from '../shared/hab.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})




export class Tab1Page {

  
  lat:number
  lon:number
  total:string
  imagePicker: any;
  uploadProgress: Observable<number>;
  usuario : any = [];

  uploadURL: Observable<string>;
  someTextUrl;
  downloadURL: Observable<string>;
  imageUrl: string;
  url;
  imagen: any;
  id: number;

  constructor(private sanitizer: DomSanitizer,public geolocation:Geolocation, private storage: AngularFireStorage,private customerAPI: habService) {
    this.getGeolocation();
    this.id=customerAPI.getKey();
    this.customerAPI.getuser(this.id).subscribe(res =>{
      console.log(res)
      this.usuario=res;
      //this.imagen = this.getImgContent();

    })
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.usuario.image_profile);
}

 
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      console.log(this.lat);
    });
  }

  upload(event) {
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `images/${randomId}`;

    const fileRef = this.storage.ref(filepath);

    // Upload image
    const task = this.storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.uploadURL = fileRef.getDownloadURL()

      }
      )
      
    ).subscribe();
  }


  cerrar(){
    this.customerAPI.nombre="";
    this.customerAPI.descripcion="";
    this.customerAPI.image="";
    this.customerAPI.userN="";
    this.customerAPI.userI="";
    this.customerAPI.userA="";
    this.customerAPI.summary="";
    this.customerAPI.userA="";
    this.customerAPI.telefono="";
    this.customerAPI.correo="";
    this.customerAPI.setKey(null);
    
    


  
  }



  getSomeText() {
    console.log(this.uploadURL) 
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'images/';
    const task = this.storage.upload(filePath, file).then(() => {
         const ref = this.storage.ref(filePath);
         const downloadURL = ref.getDownloadURL().subscribe(url => { 
         const Url = url; // for ts
         this.url = url // with this you can use it in the html
         console.log(Url);
     })
  });
}


  
}
