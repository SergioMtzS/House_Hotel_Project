import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoHabPage } from './info-hab.page';

const routes: Routes = [
  {
    path: '',
    component: InfoHabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoHabPageRoutingModule {}
