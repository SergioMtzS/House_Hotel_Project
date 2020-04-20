import { async } from '@angular/core/testing';
import { Component, OnInit, NgZone } from '@angular/core';
import { habService } from './../shared/hab.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { onErrorResumeNext } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage'


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
})

export class AddCustomerPage implements OnInit {

  CustomerForm: FormGroup;
  id: number;
  url: "string";
  nombre:"string";
  apellido:"string";
  pais:"string";
  telefono:"string";
  metodo:"string";
  ciudad:"string";
  correo:"string";
  calle:"string";
  usuario: any [];

  

  constructor(
    private customerAPI: habService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone,
    private storage: AngularFireStorage
  ) {
  
    this.CustomerForm = this.fb.group({
      _id: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      Address: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      City:new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      Country: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      pass: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      Correo: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      Telefono: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      FirstName: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      LastName: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      Metodo: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      image_profile: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      Status: new FormControl("",{validators: Validators.required, updateOn:'blur'})
    }),{updateOn:'change'}


    
    this.customerAPI.getMaxUser().subscribe(res =>{
      console.log(res)
      this.usuario=res;

      if(this.usuario.length==0){
        this.id=1;
        console.log(this.id)
      }else{
        this.id=res[0]['_id']+1;
        console.log(this.id)
      }
    })
/*

    this.CustomerForm = this.fb.group({
      
      Address: [''],
      City:[''],
      Country: [''],
      Telefono: [''],
      FirstName: [''],
      LastName: [''],
      Metodo: [''],
      image_profile: [this.url],
      Status: [true]
    })*/

   /*this.CustomerForm = new FormGroup({
      Address: new FormControl(),
      City: new FormControl(),
      Country: new FormControl(),
      Telefono: new FormControl(),
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Metodo: new FormControl(),
      image_profile: new FormControl(),
      Status: new FormControl(),
    });*/
   
    
 
  }

  ngOnInit() {
 
    
   }

   

  onFormSubmit() {
  
    
    //this.CustomerForm.patchValue([this.calle,this.ciudad,this.pais,this.telefono,this.nombre,this.apellido,this.metodo,this.url, true])
   //
   
  // this.CustomerForm.patchValue({Status: true})
  
  this.CustomerForm.get('_id').setValue(this.id);
  this.CustomerForm.get('Status').setValue(true);
    this.customerAPI.addCustomer(this.CustomerForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.CustomerForm.reset();
            //this.findOne();
            this.router.navigate(['/login']);
          })
        });
    
  }
/*
  findOne(){
    this.customerAPI.getCustomerFindOne().subscribe((res)=>{
        this.id=res['_id'];
        this.customerAPI.id=Number(this.id+1);

          })
   }
*/
uploadFile(event) {
  const randomId = Math.random().toString(36).substring(2);
  const file = event.target.files[0];
  const filePath = `images/${randomId}`;
  const task = this.storage.upload(filePath, file).then(() => {
       const ref = this.storage.ref(filePath);
       const downloadURL = ref.getDownloadURL().subscribe(url => { 

       const Url = url; // for ts
       this.url = Url // with this you can use it in the html
       let fin= url.toString();
       this.CustomerForm.get('image_profile').setValue(fin);
       console.log(url);
     
   })
});
}

 
}
