import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Country, CountryApi } from '../sdk/index'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private countryApi: CountryApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<Country[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.countryApi.find(filtro);
  }

  getById(id: number): Observable<Country> {
    return this.countryApi.findById(id);
  }

  create(country: Country): Observable<Country> {
    return this.countryApi.create(country);
  }

  update(country: Country): Observable<Country> {
    return this.countryApi.patchAttributes(country.id, country);
  }

  delete(id: number): Observable<Country> {
    let country: Country;
    country.deletedAt = new Date();
    return this.countryApi.patchAttributes(id, country);
  }
}
