import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReghabPage } from './reghab.page';

const routes: Routes = [
  {
    path: '',
    component: ReghabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReghabPageRoutingModule {}
