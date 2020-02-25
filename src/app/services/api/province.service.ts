import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Province, ProvinceApi } from '../sdk/index'

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private provinceApi: ProvinceApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<Province[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.provinceApi.find(filtro);
  }

  getById(id: number): Observable<Province> {
    return this.provinceApi.findById(id);
  }

  create(province: Province): Observable<Province> {
    return this.provinceApi.create(province);
  }

  update(province: Province): Observable<Province> {
    return this.provinceApi.patchAttributes(province.id, province);
  }

  delete(id: number): Observable<Province> {
    let province: Province;
    province.deletedAt = new Date();
    return this.provinceApi.patchAttributes(id, province);
  }
  
}
