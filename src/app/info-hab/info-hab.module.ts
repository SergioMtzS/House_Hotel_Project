import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoHabPageRoutingModule } from './info-hab-routing.module';

import { InfoHabPage } from './info-hab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoHabPageRoutingModule
  ],
  declarations: [InfoHabPage]
})
export class InfoHabPageModule {}
