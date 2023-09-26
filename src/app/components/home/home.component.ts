import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  offerCount: number = 0;

  constructor(private offerService: OfferService) {}

  ngOnInit() {
    this.getOfferCount();
  }

  getOfferCount() {
    this.offerService.getOffers().subscribe((data: any) => {
        this.offerCount = data.length;
    });
  }
}