import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Transaction, TransactionApi } from '../sdk/index';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private transactionApi: TransactionApi) { }

  getAll(filtro: any = { deleted_at: null }): Observable<Transaction[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }
    return this.transactionApi.find(filtro);
  }

  getById(id: number): Observable<Transaction> {
    return this.transactionApi.findById(id);
  }

  create(transaction: Transaction): Observable<Transaction> {
    console.log(transaction)
    return this.transactionApi.create(transaction);
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.transactionApi.patchAttributes(transaction.id, transaction)
  }

  delete(id: number): Observable<Transaction> {
    let transaction: Transaction;
    transaction.deletedAt = new Date();
    return this.transactionApi.patchAttributes(id, transaction)
  }

  regenerateToken(id: number): Observable<Transaction> {
    return this.transactionApi.regenerateToken(id)
  }

  scanQr(id: number, scanned: string): Observable<Transaction> {
    return this.transactionApi.scanQr(id, scanned)
  }
}
