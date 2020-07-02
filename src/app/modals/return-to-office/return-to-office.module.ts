import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnToOfficePageRoutingModule } from './return-to-office-routing.module';

import { ReturnToOfficePage } from './return-to-office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnToOfficePageRoutingModule
  ],
  declarations: [ReturnToOfficePage]
})
export class ReturnToOfficePageModule {}
