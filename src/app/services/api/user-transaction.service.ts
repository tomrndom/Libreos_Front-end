import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserTransaction, UserTransactionApi } from '../sdk/index';

@Injectable({
  providedIn: 'root'
})
export class UserTransactionService {

  constructor(private userTransactionApi: UserTransactionApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<UserTransaction[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.userTransactionApi.find(filtro);
  }

  getById(id: number): Observable<UserTransaction> {
    return this.userTransactionApi.findById(id);
  }

  create(userTransaction: UserTransaction): Observable<UserTransaction> {
    return this.userTransactionApi.create(userTransaction);
  }

  update(userTransaction: UserTransaction): Observable<UserTransaction> {
    return this.userTransactionApi.patchAttributes(userTransaction.id, userTransaction);
  }

  delete(id: number): Observable<UserTransaction> {
    let userTransaction: UserTransaction;
    userTransaction.deletedAt = new Date();
    return this.userTransactionApi.patchAttributes(id, userTransaction);
  }

}
