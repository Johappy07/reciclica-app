import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent implements OnInit {

  @Input() hasHeader!: boolean;   // Tanpa nilai default
  @Input() hasFooter!: boolean;   // Tanpa nilai default
  @Input() status!: string;       // Tanpa nilai default
  @Input() updatedAt!: string;    // Tanpa nilai default
  @Input() createdAt!: string;    // Tanpa nilai default
  @Input() notes!: string;        // Tanpa nilai default
  @Input() value!: string;        // Tanpa nilai default



  constructor() { }

  ngOnInit() {
    // Anda bisa menambahkan logika inisialisasi di sini jika diperlukan
  }
}
