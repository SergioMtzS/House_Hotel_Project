import { Component, OnInit, NgZone } from '@angular/core';
import { async } from '@angular/core/testing';
import { habService } from './../shared/hab.service';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage'
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { onErrorResumeNext } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-reghab',
  templateUrl: './reghab.page.html',
  styleUrls: ['./reghab.page.scss'],
})
export class ReghabPage implements OnInit {


  url
  CustomerForm: FormGroup;
  id: number;
  fin;
  lat:number;
  lon:number;
  map: GoogleMap;
  _id;
  idHab;
  habitacion: any [];
  
  

  constructor(
    private customerAPI: habService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone,
    public geolocation:Geolocation,
    private storage: AngularFireStorage,
    private googleMaps: GoogleMaps
   
  ) {

    this.customerAPI.getMaxUser().subscribe(res =>{
      console.log(res)
      this.habitacion=res;

      if(this.habitacion.length==0){
        this.idHab=1;
        console.log(this.id)
      }else{
        this.idHab=res[0]['_id']+1;
        console.log(this.id)
      }
    })

    this._id=this.customerAPI.getKey();
    console.log(this._id)



    console.log(this._id)
    this.CustomerForm = this.fb.group({
      _id: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      name: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      identifier_user:new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      largo:new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      ancho: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      summary: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      house_rules: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      property_type: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      minimum_nights: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      maximum_nigths: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      bedrooms: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      beds: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      bathrooms: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      price: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      latitude: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      longitude: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      picture_url: new FormControl("",{validators: Validators.required, updateOn:'blur'})
    }),{updateOn:'change'}
    
 
  }

  ngOnInit() {
  
    
   }

   getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      console.log(this.lat);
      console.log(this.lon);
      this.loadMap();
    });
  }

   onFormSubmit() {
  
    
    //this.CustomerForm.patchValue([this.calle,this.ciudad,this.pais,this.telefono,this.nombre,this.apellido,this.metodo,this.url, true])
   //
   
  // this.CustomerForm.patchValue({Status: true})
  this.CustomerForm.get('_id').setValue(this.idHab);
  this.CustomerForm.get('identifier_user').setValue(this._id);
  this.CustomerForm.get('latitude').setValue(this.lat);
  this.CustomerForm.get('longitude').setValue(this.lon);
    this.customerAPI.addHab(this.CustomerForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.CustomerForm.reset();
            //this.findOne();
            
          })
        });
    
  }

  uploadFile(event) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    //const filePath = `images/${randomId}`;
    const filePath = `images/`;
    const task = this.storage.upload(filePath, file).then(() => {
         const ref = this.storage.ref(filePath);
         const downloadURL = ref.getDownloadURL().subscribe(url => { 
  
         const Url = url; // for ts
         this.url = Url // with this you can use it in the html
         this.fin= url.toString();
         this.CustomerForm.get('picture_url').setValue(this.fin);
         console.log(url);
       
     })
  });
  }
   


  
  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }
 

  
}


