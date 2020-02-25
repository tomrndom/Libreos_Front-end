/* tslint:disable */
import {
  Location,
  UserBook,
  UserTransaction
} from '../index';

declare var Object: any;
export interface AppUserInterface {
  "id": number;
  "username": string;
  "firstname": string;
  "lastname": string;
  "email": string;
  "phone": string;
  "realm"?: string;
  "emailVerified": boolean;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  "password"?: string;
  accessTokens?: any[];
  location?: Location;
  userBooks?: UserBook[];
  fromUserTransaction?: UserTransaction[];
  toUserTransaction?: UserTransaction[];
}

export class AppUser implements AppUserInterface {
  "id": number;
  "username": string;
  "firstname": string;
  "lastname": string;
  "email": string;
  "phone": string;
  "realm"?: string;
  "emailVerified": boolean;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  "password"?: string;
  accessTokens?: any[];
  location?: Location;
  userBooks?: UserBook[];
  fromUserTransaction?: UserTransaction[];
  toUserTransaction?: UserTransaction[];
  constructor(data?: AppUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AppUser`.
   */
  public static getModelName() {
    return "AppUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AppUser for dynamic purposes.
  **/
  public static factory(data: AppUserInterface): AppUser{
    return new AppUser(data);
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
      name: 'AppUser',
      plural: 'AppUsers',
      path: 'AppUsers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "firstname": {
          name: 'firstname',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        location: {
          name: 'location',
          type: 'Location',
          model: 'Location',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        userBooks: {
          name: 'userBooks',
          type: 'UserBook[]',
          model: 'UserBook',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        fromUserTransaction: {
          name: 'fromUserTransaction',
          type: 'UserTransaction[]',
          model: 'UserTransaction',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'fromUserId'
        },
        toUserTransaction: {
          name: 'toUserTransaction',
          type: 'UserTransaction[]',
          model: 'UserTransaction',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'toUserId'
        },
      }
    }
  }
}
