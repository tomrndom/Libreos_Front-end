import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { BookCondition, BookConditionApi } from '../sdk/index'
@Injectable({
  providedIn: 'root'
})
export class BookConditionService {

  constructor(private bookConditionApi: BookConditionApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<BookCondition[]> {
    if (filtro) filtro = { deleted_at: null }
    return this.bookConditionApi.find(filtro);
  }

  getById(id: number): Observable<BookCondition> {
    return this.bookConditionApi.findById(id);
  }

  create(bookCondition: BookCondition): Observable<BookCondition> {
    return this.bookConditionApi.create(bookCondition);
  }

  update(bookCondition: BookCondition): Observable<BookCondition> {
    return this.bookConditionApi.patchAttributes(bookCondition);
  }

  delete(id: number): Observable<BookCondition> {
    let bookCondition: BookCondition;
    bookCondition.deletedAt = new Date();
    return this.bookConditionApi.patchAttributes(id, bookCondition);
  }
}
