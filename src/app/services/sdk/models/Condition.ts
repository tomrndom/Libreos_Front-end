/* tslint:disable */
import {
  BookCondition
} from '../index';

declare var Object: any;
export interface ConditionInterface {
  "id": number;
  "description": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  bookCondition?: BookCondition[];
}

export class Condition implements ConditionInterface {
  "id": number;
  "description": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  bookCondition?: BookCondition[];
  constructor(data?: ConditionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Condition`.
   */
  public static getModelName() {
    return "Condition";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Condition for dynamic purposes.
  **/
  public static factory(data: ConditionInterface): Condition{
    return new Condition(data);
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
      name: 'Condition',
      plural: 'Conditions',
      path: 'Conditions',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
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
        bookCondition: {
          name: 'bookCondition',
          type: 'BookCondition[]',
          model: 'BookCondition',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'conditionId'
        },
      }
    }
  }
}
