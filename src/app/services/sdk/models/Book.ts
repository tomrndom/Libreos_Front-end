/* tslint:disable */
import {
  BookCondition,
  Gender,
  Transaction,
  UserBook
} from '../index';

declare var Object: any;
export interface BookInterface {
  "id": number;
  "title": string;
  "isbn": string;
  "publisher": string;
  "language": string;
  "authors": string;
  "synopsys"?: string;
  "pages"?: number;
  "genderId": number;
  "publishDate"?: Date;
  "available": number;
  "image"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  bookConditions?: BookCondition;
  gender?: Gender;
  transactions?: Transaction[];
  userBooks?: UserBook[];
}

export class Book implements BookInterface {
  "id": number;
  "title": string;
  "isbn": string;
  "publisher": string;
  "language": string;
  "authors": string;
  "synopsys"?: string;
  "pages"?: number;
  "genderId": number;
  "publishDate"?: Date;
  "available": number;
  "image"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  bookConditions?: BookCondition;
  gender?: Gender;
  transactions?: Transaction[];
  userBooks?: UserBook[];
  constructor(data?: BookInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Book`.
   */
  public static getModelName() {
    return "Book";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Book for dynamic purposes.
  **/
  public static factory(data: BookInterface): Book{
    return new Book(data);
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
      name: 'Book',
      plural: 'Books',
      path: 'Books',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "isbn": {
          name: 'isbn',
          type: 'string'
        },
        "publisher": {
          name: 'publisher',
          type: 'string'
        },
        "language": {
          name: 'language',
          type: 'string'
        },
        "authors": {
          name: 'authors',
          type: 'string'
        },
        "synopsys": {
          name: 'synopsys',
          type: 'string'
        },
        "pages": {
          name: 'pages',
          type: 'number'
        },
        "genderId": {
          name: 'genderId',
          type: 'number'
        },
        "publishDate": {
          name: 'publishDate',
          type: 'Date'
        },
        "available": {
          name: 'available',
          type: 'number'
        },
        "image": {
          name: 'image',
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
        bookConditions: {
          name: 'bookConditions',
          type: 'BookCondition',
          model: 'BookCondition',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'bookId'
        },
        gender: {
          name: 'gender',
          type: 'Gender',
          model: 'Gender',
          relationType: 'belongsTo',
                  keyFrom: 'genderId',
          keyTo: 'id'
        },
        transactions: {
          name: 'transactions',
          type: 'Transaction[]',
          model: 'Transaction',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'bookId'
        },
        userBooks: {
          name: 'userBooks',
          type: 'UserBook[]',
          model: 'UserBook',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'bookId'
        },
      }
    }
  }
}
