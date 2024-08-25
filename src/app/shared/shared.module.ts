import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';

@NgModule({
  declarations: [
    PickupCallCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule  // Tambahkan IonicModule di sini
  ],
  exports: [
    PickupCallCardComponent,
    IonicModule  // Ekspor juga jika perlu digunakan di module lain
  ]
})
export class SharedModule { }
