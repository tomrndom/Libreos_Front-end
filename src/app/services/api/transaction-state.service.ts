import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionState, TransactionStateApi } from '../sdk/index';
@Injectable({
  providedIn: 'root'
})
export class TransactionStateService {

  constructor(private transactionStateApi: TransactionStateApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<TransactionState[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.transactionStateApi.find(filtro);
  }

  getById(id: number): Observable<TransactionState> {
    return this.transactionStateApi.findById(id);
  }

  create(transactionState: TransactionState): Observable<TransactionState> {
    return this.transactionStateApi.create(transactionState);
  }

  update(transactionState: TransactionState): Observable<TransactionState> {
    return this.transactionStateApi.patchAttributes(transactionState.id, transactionState);
  }

  delete(id: number): Observable<TransactionState> {
    let transactionState: TransactionState;
    transactionState.deletedAt = new Date();
    return this.transactionStateApi.patchAttributes(id, transactionState);
  }
}
