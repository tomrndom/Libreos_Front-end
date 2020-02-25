/* tslint:disable */
import {
  Province
} from '../index';

declare var Object: any;
export interface CountryInterface {
  "id": number;
  "countryCode": string;
  "name": string;
  "code": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  provinces?: Province[];
}

export class Country implements CountryInterface {
  "id": number;
  "countryCode": string;
  "name": string;
  "code": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  provinces?: Province[];
  constructor(data?: CountryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Country`.
   */
  public static getModelName() {
    return "Country";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Country for dynamic purposes.
  **/
  public static factory(data: CountryInterface): Country{
    return new Country(data);
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
      name: 'Country',
      plural: 'Countries',
      path: 'Countries',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "countryCode": {
          name: 'countryCode',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "code": {
          name: 'code',
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
        provinces: {
          name: 'provinces',
          type: 'Province[]',
          model: 'Province',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'countryId'
        },
      }
    }
  }
}
