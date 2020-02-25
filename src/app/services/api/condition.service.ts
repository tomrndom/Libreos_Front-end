import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Condition, ConditionApi } from '../sdk/index';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private conditionApi: ConditionApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<Condition[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.conditionApi.find(filtro);
  }

  getById(id: number): Observable<Condition> {
    return this.conditionApi.findById(id);
  }

  create(condition: Condition): Observable<Condition> {
    return this.conditionApi.create(condition);
  }

  update(condition: Condition): Observable<Condition> {
    return this.conditionApi.patchAttributes(condition.id, condition);
  }

  delete(id: number): Observable<Condition> {
    let condition: Condition;
    condition.deletedAt = new Date();
    return this.conditionApi.patchAttributes(id, condition);
  }
}
