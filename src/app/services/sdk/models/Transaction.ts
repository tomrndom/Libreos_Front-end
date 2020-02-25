/* tslint:disable */
import {
  Book,
  TransactionState
} from '../index';

declare var Object: any;
export interface TransactionInterface {
  "id": number;
  "bookId": number;
  "transactionStateId": number;
  "tokenQr"?: string;
  "tokenCreatedAt"?: Date;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  book?: Book;
  transactionStates?: TransactionState;
}

export class Transaction implements TransactionInterface {
  "id": number;
  "bookId": number;
  "transactionStateId": number;
  "tokenQr"?: string;
  "tokenCreatedAt"?: Date;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  book?: Book;
  transactionStates?: TransactionState;
  constructor(data?: TransactionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Transaction`.
   */
  public static getModelName() {
    return "Transaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Transaction for dynamic purposes.
  **/
  public static factory(data: TransactionInterface): Transaction{
    return new Transaction(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Transaction',
      plural: 'Transactions',
      path: 'Transactions',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "bookId": {
          name: 'bookId',
          type: 'number'
        },
        "transactionStateId": {
          name: 'transactionStateId',
          type: 'number'
        },
        "tokenQr": {
          name: 'tokenQr',
          type: 'string'
        },
        "tokenCreatedAt": {
          name: 'tokenCreatedAt',
          type: 'Date'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "deletedAt": {
          name: 'deletedAt',
          type: 'Date'
        },
      },
      relations: {
        book: {
          name: 'book',
          type: 'Book',
          model: 'Book',
          relationType: 'belongsTo',
                  keyFrom: 'bookId',
          keyTo: 'id'
        },
        transactionStates: {
          name: 'transactionStates',
          type: 'TransactionState',
          model: 'TransactionState',
          relationType: 'belongsTo',
                  keyFrom: 'transactionStateId',
          keyTo: 'id'
        },
      }
    }
  }
}
