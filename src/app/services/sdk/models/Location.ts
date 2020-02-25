/* tslint:disable */
import {
  City
} from '../index';

declare var Object: any;
export interface LocationInterface {
  "id": number;
  "latitude": string;
  "longitude": string;
  "cityCp": number;
  "userId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  city?: City;
}

export class Location implements LocationInterface {
  "id": number;
  "latitude": string;
  "longitude": string;
  "cityCp": number;
  "userId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "deletedAt"?: Date;
  city?: City;
  constructor(data?: LocationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Location`.
   */
  public static getModelName() {
    return "Location";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Location for dynamic purposes.
  **/
  public static factory(data: LocationInterface): Location{
    return new Location(data);
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
      name: 'Location',
      plural: 'Locations',
      path: 'Locations',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "latitude": {
          name: 'latitude',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'string'
        },
        "cityCp": {
          name: 'cityCp',
          type: 'number'
        },
        "userId": {
          name: 'userId',
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
        city: {
          name: 'city',
          type: 'City',
          model: 'City',
          relationType: 'belongsTo',
                  keyFrom: 'cityCp',
          keyTo: 'id'
        },
      }
    }
  }
}
