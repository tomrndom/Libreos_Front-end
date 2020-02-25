/* tslint:disable */
import {
  Transaction
} from '../index';

declare var Object: any;
export interface TransactionStateInterface {
  "id": number;
  "name": string;
  "description": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  transactions?: Transaction[];
}

export class TransactionState implements TransactionStateInterface {
  "id": number;
  "name": string;
  "description": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  transactions?: Transaction[];
  constructor(data?: TransactionStateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TransactionState`.
   */
  public static getModelName() {
    return "TransactionState";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TransactionState for dynamic purposes.
  **/
  public static factory(data: TransactionStateInterface): TransactionState{
    return new TransactionState(data);
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
      name: 'TransactionState',
      plural: 'TransactionStates',
      path: 'TransactionStates',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
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
        transactions: {
          name: 'transactions',
          type: 'Transaction[]',
          model: 'Transaction',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'transactionStateId'
        },
      }
    }
  }
}
