import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Gender, GenderApi } from '../sdk/index';
@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private genderApi: GenderApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<Gender[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.genderApi.find(filtro);
  }

  getById(id: number): Observable<Gender> {
    return this.genderApi.findById(id);
  }

  create(gender: Gender): Observable<Gender> {
    return this.genderApi.create(gender);
  }

  update(gender: Gender): Observable<Gender> {
    return this.genderApi.patchAttributes(gender.id, gender);
  }

  delete(id: number): Observable<Gender> {
    let gender: Gender;
    gender.deletedAt = new Date();
    return this.genderApi.patchAttributes(id, gender);
  }
}
