/* tslint:disable */
import {
  Book
} from '../index';

declare var Object: any;
export interface GenderInterface {
  "id": number;
  "name": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  books?: Book[];
}

export class Gender implements GenderInterface {
  "id": number;
  "name": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  books?: Book[];
  constructor(data?: GenderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Gender`.
   */
  public static getModelName() {
    return "Gender";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Gender for dynamic purposes.
  **/
  public static factory(data: GenderInterface): Gender{
    return new Gender(data);
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
      name: 'Gender',
      plural: 'Genders',
      path: 'Genders',
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
        books: {
          name: 'books',
          type: 'Book[]',
          model: 'Book',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'genderId'
        },
      }
    }
  }
}
