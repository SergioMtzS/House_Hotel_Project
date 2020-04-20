import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReghabPageRoutingModule } from './reghab-routing.module';

import { ReghabPage } from './reghab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReghabPageRoutingModule
  ],
  declarations: [ReghabPage]
})
export class ReghabPageModule {}
