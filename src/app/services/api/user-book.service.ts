import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserBook, UserBookApi } from '../sdk/index';

@Injectable({
  providedIn: 'root'
})
export class UserBookService {

  constructor(private userBookApi: UserBookApi) { }

  getAll(filtro: any = {deleted_at: null}):Observable<UserBook[]>{
    if (filtro) filtro = {...filtro,deleted_at: null}
    return this.userBookApi.find(filtro);
  }

  getById(id: number): Observable<UserBook>{
    return this.userBookApi.findById(id);
  }

  create(userBook: UserBook): Observable<UserBook>{
    return this.userBookApi.create(userBook);
  }

  update(userBook: UserBook): Observable<UserBook>{
    return this.userBookApi.patchAttributes(userBook.id, userBook);
  }

  delete(id: number): Observable<UserBook>{
    let userBook: UserBook;
    userBook.deletedAt = new Date();
    return this.userBookApi.patchAttributes(id,userBook);
  }
}
