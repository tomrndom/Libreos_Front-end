/* tslint:disable */
import {
  AppUser,
  Book
} from '../index';

declare var Object: any;
export interface UserBookInterface {
  "id": number;
  "isOwner": number;
  "onHand": number;
  "userId": number;
  "bookId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  user?: AppUser;
  book?: Book;
}

export class UserBook implements UserBookInterface {
  "id": number;
  "isOwner": number;
  "onHand": number;
  "userId": number;
  "bookId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  user?: AppUser;
  book?: Book;
  constructor(data?: UserBookInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserBook`.
   */
  public static getModelName() {
    return "UserBook";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserBook for dynamic purposes.
  **/
  public static factory(data: UserBookInterface): UserBook{
    return new UserBook(data);
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
      name: 'UserBook',
      plural: 'UserBooks',
      path: 'UserBooks',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "isOwner": {
          name: 'isOwner',
          type: 'number'
        },
        "onHand": {
          name: 'onHand',
          type: 'number'
        },
        "userId": {
          name: 'userId',
          type: 'number'
        },
        "bookId": {
          name: 'bookId',
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
        user: {
          name: 'user',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        book: {
          name: 'book',
          type: 'Book',
          model: 'Book',
          relationType: 'belongsTo',
                  keyFrom: 'bookId',
          keyTo: 'id'
        },
      }
    }
  }
}
