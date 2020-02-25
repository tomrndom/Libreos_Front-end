/* tslint:disable */
import {
  Book,
  Condition
} from '../index';

declare var Object: any;
export interface BookConditionInterface {
  "id": number;
  "bookId": number;
  "conditionId": number;
  "personalOpinion": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  book?: Book;
  condition?: Condition;
}

export class BookCondition implements BookConditionInterface {
  "id": number;
  "bookId": number;
  "conditionId": number;
  "personalOpinion": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  book?: Book;
  condition?: Condition;
  constructor(data?: BookConditionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BookCondition`.
   */
  public static getModelName() {
    return "BookCondition";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BookCondition for dynamic purposes.
  **/
  public static factory(data: BookConditionInterface): BookCondition{
    return new BookCondition(data);
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
      name: 'BookCondition',
      plural: 'BookConditions',
      path: 'BookConditions',
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
        "conditionId": {
          name: 'conditionId',
          type: 'number'
        },
        "personalOpinion": {
          name: 'personalOpinion',
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
        book: {
          name: 'book',
          type: 'Book',
          model: 'Book',
          relationType: 'belongsTo',
                  keyFrom: 'bookId',
          keyTo: 'id'
        },
        condition: {
          name: 'condition',
          type: 'Condition',
          model: 'Condition',
          relationType: 'belongsTo',
                  keyFrom: 'conditionId',
          keyTo: 'id'
        },
      }
    }
  }
}
