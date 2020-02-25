/* tslint:disable */
import {
  Country,
  City
} from '../index';

declare var Object: any;
export interface ProvinceInterface {
  "id": number;
  "name": string;
  "code31662": string;
  "countryId": number;
  "abbreviation": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  country?: Country;
  cities?: City[];
}

export class Province implements ProvinceInterface {
  "id": number;
  "name": string;
  "code31662": string;
  "countryId": number;
  "abbreviation": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  country?: Country;
  cities?: City[];
  constructor(data?: ProvinceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Province`.
   */
  public static getModelName() {
    return "Province";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Province for dynamic purposes.
  **/
  public static factory(data: ProvinceInterface): Province{
    return new Province(data);
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
      name: 'Province',
      plural: 'Provinces',
      path: 'Provinces',
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
        "code31662": {
          name: 'code31662',
          type: 'string'
        },
        "countryId": {
          name: 'countryId',
          type: 'number'
        },
        "abbreviation": {
          name: 'abbreviation',
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
        country: {
          name: 'country',
          type: 'Country',
          model: 'Country',
          relationType: 'belongsTo',
                  keyFrom: 'countryId',
          keyTo: 'id'
        },
        cities: {
          name: 'cities',
          type: 'City[]',
          model: 'City',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'provinceId'
        },
      }
    }
  }
}
