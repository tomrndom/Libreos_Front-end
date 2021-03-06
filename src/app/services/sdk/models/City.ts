/* tslint:disable */
import {
  Location,
  Province
} from '../index';

declare var Object: any;
export interface CityInterface {
  "id": number;
  "name": string;
  "postalCode": string;
  "provinceId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  locations?: Location[];
  province?: Province;
}

export class City implements CityInterface {
  "id": number;
  "name": string;
  "postalCode": string;
  "provinceId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  locations?: Location[];
  province?: Province;
  constructor(data?: CityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `City`.
   */
  public static getModelName() {
    return "City";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of City for dynamic purposes.
  **/
  public static factory(data: CityInterface): City{
    return new City(data);
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
      name: 'City',
      plural: 'Cities',
      path: 'Cities',
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
        "postalCode": {
          name: 'postalCode',
          type: 'string'
        },
        "provinceId": {
          name: 'provinceId',
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
        locations: {
          name: 'locations',
          type: 'Location[]',
          model: 'Location',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'cityCp'
        },
        province: {
          name: 'province',
          type: 'Province',
          model: 'Province',
          relationType: 'belongsTo',
                  keyFrom: 'provinceId',
          keyTo: 'id'
        },
      }
    }
  }
}
