/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { AppUser } from '../../models/AppUser';
import { Book } from '../../models/Book';
import { City } from '../../models/City';
import { BookCondition } from '../../models/BookCondition';
import { Condition } from '../../models/Condition';
import { Country } from '../../models/Country';
import { Location } from '../../models/Location';
import { Gender } from '../../models/Gender';
import { Transaction } from '../../models/Transaction';
import { Province } from '../../models/Province';
import { TransactionState } from '../../models/TransactionState';
import { UserBook } from '../../models/UserBook';
import { UserTransaction } from '../../models/UserTransaction';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Role: Role,
    AppUser: AppUser,
    Book: Book,
    City: City,
    BookCondition: BookCondition,
    Condition: Condition,
    Country: Country,
    Location: Location,
    Gender: Gender,
    Transaction: Transaction,
    Province: Province,
    TransactionState: TransactionState,
    UserBook: UserBook,
    UserTransaction: UserTransaction,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
