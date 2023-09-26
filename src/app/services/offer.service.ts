import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  getPeliculas(): Observable<Offer> {
    return this.http
      .get<Offer>(environment.baseUrl + '/offers')
  }

  getPeliculaById(id: number): Observable<Offer> {
    return this.http
      .get<Offer>(environment.baseUrl + '/offers/' + id)
  }

  addPelicula(pelicula: Offer): Observable<Offer> {
    return this.http
      .post<Offer>(environment.baseUrl + '/offers', pelicula)
  }

  updatePelicula(pelicula: Offer): Observable<Offer> {
    return this.http
      .put<Offer>(environment.baseUrl + '/offers/' + pelicula.id, pelicula)
  }

  deletePelicula(id: number): Observable<Offer> {
    return this.http
      .delete<Offer>(environment.baseUrl + '/offers/' + id)
  }
}
