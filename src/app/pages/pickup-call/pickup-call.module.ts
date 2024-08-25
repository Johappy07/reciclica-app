import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupCallPageRoutingModule } from './pickup-call-routing.module';

import { PickupCallPage } from './pickup-call.page';
import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupCallPageRoutingModule
  ],
  declarations: [
    PickupCallPage
  ]
})
export class PickupCallPageModule {}
