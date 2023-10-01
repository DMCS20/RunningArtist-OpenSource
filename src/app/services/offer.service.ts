import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getOffers(): Observable<Offer> {
    return this.http
      .get<Offer>(environment.baseUrl + '/offers')
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http
      .get<Offer>(environment.baseUrl + '/offers/' + id)
  }

  addOffer(offer: Offer): Observable<Offer> {
    return this.http
      .post<Offer>(environment.baseUrl + '/offers', offer)
  }

  addOfferWithId(offer: Offer): Observable<Offer> {
    return this.http
      .post<Offer>(environment.baseUrl + '/offers/'+offer.id, offer)
  }

  updateOffer(offer: Offer): Observable<Offer> {
    return this.http
      .put<Offer>(environment.baseUrl + '/offers/' + offer.id, offer)
  }

  deleteOffer(id: number): Observable<Offer> {
    return this.http
      .delete<Offer>(environment.baseUrl + '/offers/' + id)
  }
}
