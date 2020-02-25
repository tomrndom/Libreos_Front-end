import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Location, LocationApi } from '../sdk/index';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private locationApi: LocationApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<Location[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.locationApi.find(filtro);
  }

  getById(id: number): Observable<Location> {
    return this.locationApi.findById(id);
  }

  create(location: Location): Observable<Location> {
    return this.locationApi.create(location);
  }

  update(location: Location): Observable<Location> {
    return this.locationApi.patchAttributes(location.id, location);
  }

  delete(id: number): Observable<Location> {
    let location: Location;
    location.deletedAt = new Date();
    return this.locationApi.patchAttributes(id, location);
  }
}
