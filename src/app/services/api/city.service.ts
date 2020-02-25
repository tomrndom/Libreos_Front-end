import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City, CityApi } from '../sdk/index'
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private cityApi: CityApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<City[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.cityApi.find(filtro);
  }

  getById(id: number): Observable<City> {
    return this.cityApi.findById(id);
  }

  create(city: City): Observable<City> {
    return this.cityApi.create(city);
  }

  update(city: City): Observable<City> {
    return this.cityApi.patchAttributes(city);
  }

  delete(id: number): Observable<City> {
    let city: City;
    city.deletedAt = new Date();
    return this.cityApi.patchAttributes(id, city)
  }
}
