import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {


  private db = "assets/db.json";

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get(this.db);
  }

}