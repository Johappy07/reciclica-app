import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToPickupCall() {
    this.route.navigate(['my']);
  }

  newPickupCall() {
    this.route.navigate(['pickup-call']);

  }
}
