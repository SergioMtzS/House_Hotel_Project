import { Component, NgZone ,OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { habService } from './../shared/hab.service';
import { Habitaciones } from '../classes/Habitaciones';
import { count } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  CustomerForm: FormGroup;
  A: number;
  B:number;
  nombre:String;
  calle: String;
  apellido:String;
  Habitaciones: any = [];
  Habitaciones2: any = [];
  Habitaciones3: any = [];
  cont: number;
  search: String;
  id
  likes
  //updateCustomerForm: FormGroup;
  obj: Object;
  idH: any;
  buttonColor: string = 'transparent';
  //habitaciones:Habitaciones[]=[];
  habitaciones: any =[]

  constructor(private API : habService,/*,private actRoute: ActivatedRoute,
    private router: Router,public fb: FormBuilder*/private sanitizer: DomSanitizer, public fb: FormBuilder, private zone: NgZone) {

      this.API.getExp().subscribe(res =>{
        console.log(res)
        this.habitaciones=res;
        console.log(this.habitaciones.likes)
      })

      this.CustomerForm = this.fb.group({
        id: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
        like: new FormControl("",{validators: Validators.required, updateOn:'blur'}),
      }),{updateOn:'change'}
    
  }

  
  ngOnInit() {
 
    
  }



  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.habitaciones[0]['picture_url']);
}


onFormSubmit() {
  
    
  //this.CustomerForm.patchValue([this.calle,this.ciudad,this.pais,this.telefono,this.nombre,this.apellido,this.metodo,this.url, true])
 //
 
// this.CustomerForm.patchValue({Status: true})

this.CustomerForm.get('id').setValue(this.id);
this.CustomerForm.get('like').setValue(this.likes);
  this.API.like(this.CustomerForm.value)
      .subscribe((res) => {
        this.zone.run(() => {
          console.log(res)
          this.CustomerForm.reset();
          //this.findOne();
         
        })
      });
  
}
 

like(i){
    this.id = this.habitaciones[i]['_id']
    this.buttonColor = '#345465'; 
    let like = this.habitaciones[i]['likes']
    this.habitaciones[i]['likes']=like+1;
    this.likes=like+1;
    
}


select(hab,i){
    
    this.API.image=hab.picture_url
    this.API.nombre=hab.name
    this.API.descripcion=hab.summary
    this.API.userA=hab.fin[0]['LastName']
    this.API.userN=hab.fin[0]['FirstName']
    this.API.userI=hab.fin[0]['image_profile']
    this.API.correo=hab.fin[0]['Correo']
    this.API.telefono=hab.fin[0]['Telefono']



    console.log(hab.fin[0]['FirstName'])
}
     
    
    
  

}
