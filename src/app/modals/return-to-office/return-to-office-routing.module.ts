import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnToOfficePage } from './return-to-office.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnToOfficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnToOfficePageRoutingModule {}
