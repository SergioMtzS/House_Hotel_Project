import { habService } from './../shared/hab.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  strMessage: string;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  email: string;
  password: string;
  bleengt:Boolean;
  usuario: any[];
  ck: number;
  id: number;
    constructor(private router: Router, public alertController: AlertController, private API: habService) { }
  
    ngOnInit() {
    }
  
   onLogin(strcorreo:string,pass:string){

    this.bleengt=false;

    (strcorreo) ? (this.regexp.test(strcorreo)) ? this.fnerror():this.fnerror('Error: Error correo no valido'): this.fnerror('Error: Error favor de llenar el campo correo');

  if(!this.bleengt){

      this.check(strcorreo,pass);

    }else{

      this.noexistuser();

    }




/*
      if(1==1){
       
  
        console.log('Successfuly logged in!');
        this.router.navigateByUrl('/tabs');
       
        }*/
        
    }

    check(email:string,pass:string){
      let ck:number;
      this.API.check(email,pass).subscribe(res =>{
        this.usuario=res;
        //console.log(this.usuario)
        if(this.usuario.length==0){
            ck=0;
            console.log("MAL")
            this.errorI();
        }else{
          console.log("BIEN")
          
          
          this.API.setKey(res[0]['_id']);
          this.router.navigateByUrl('/tabs');

          ck=1;
        }
      })

      return ck
    }


    fnerror(msg?: string){

      if(msg){
        this.strMessage +=msg+'<br>';
        this.bleengt=true;
      }else if(this.bleengt){
        console.log('adios');
        this.bleengt=true;
  
      }else{
        this.bleengt=false;
  
      }
     
    }


    async errorI() {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ha ocurrido un error',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async noexistuser() {
      const alert = await this.alertController.create({
        header: 'Invalido',
        message: 'Verifica el correo',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
  
  