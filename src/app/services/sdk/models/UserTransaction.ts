/* tslint:disable */
import {
  Transaction,
  AppUser
} from '../index';

declare var Object: any;
export interface UserTransactionInterface {
  "id": number;
  "fromUserId": number;
  "toUserId": number;
  "transactionId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  transaction?: Transaction;
  fromUser?: AppUser;
  toUser?: AppUser;
}

export class UserTransaction implements UserTransactionInterface {
  "id": number;
  "fromUserId": number;
  "toUserId": number;
  "transactionId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  transaction?: Transaction;
  fromUser?: AppUser;
  toUser?: AppUser;
  constructor(data?: UserTransactionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserTransaction`.
   */
  public static getModelName() {
    return "UserTransaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserTransaction for dynamic purposes.
  **/
  public static factory(data: UserTransactionInterface): UserTransaction{
    return new UserTransaction(data);
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
      name: 'UserTransaction',
      plural: 'UserTransactions',
      path: 'UserTransactions',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "fromUserId": {
          name: 'fromUserId',
          type: 'number'
        },
        "toUserId": {
          name: 'toUserId',
          type: 'number'
        },
        "transactionId": {
          name: 'transactionId',
          type: 'number'
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
        transaction: {
          name: 'transaction',
          type: 'Transaction',
          model: 'Transaction',
          relationType: 'belongsTo',
                  keyFrom: 'transactionId',
          keyTo: 'id'
        },
        fromUser: {
          name: 'fromUser',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'id'
        },
        toUser: {
          name: 'toUser',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'id'
        },
      }
    }
  }
}
