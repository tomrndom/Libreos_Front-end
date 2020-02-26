import { Injectable } from '@angular/core';
import { Observable, from } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Storage } from '@ionic/storage';

import { AppUserApi, AppUser } from '../sdk/index'

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(
    private userApi: AppUserApi,
    private storage: Storage
  ) { }

  isLoggedIn() {
    return this.token ? true : false;
  }

  login(user, password, remember?) {
    let credentials = { "username": user, "password": password };
    return this.userApi.login(credentials, ['user'], remember)
      .pipe(
        map((data: any) => {
          this.user = data.user;
          this.token = data.id;
        })
      )
  }
  logout() {
    this.storage.remove('token');
    this.storage.remove('user');
  }

  set token(token: any) {
    this.storage.set('token', token);
  }
  get token(): any {
    return this.storage.get('token')
      .then((token) => {
        return token;
      })
      .catch((err) => {
        return null;
      });

  }

  set user(user: any) {
    this.storage.set('user', JSON.stringify(user))
  }

  setUser(user:any){
    this.storage.set('user', JSON.stringify(user))
  }
  get user() {
    if (this.isLoggedIn()) {
      return this.storage.get('user')
        .then((token) => {
          return token;
        })
        .catch((err) => {
          return null;
        })
    } else {
      return null;
    }
  }

  getUsers(): Observable<any> {
    return this.userApi.count();
  }

  updateUser(user: any): Observable<any> {
    return this.userApi.patchAttributes(user.id, user)
  }

  //TODO: in Where, only show books when its the last user_book(history)
  getUserBooks(id) {
    let filter = {
      "where": {
        "onHand":"1"
      },
      "include": { 'book': ['gender' ,{'bookConditions':'condition'} ] }
    }
    return this.userApi.getUserBooks(id, filter).pipe(
      map(items => items.map(item => [item.book, item.isOwner]))
    )
  }

  createUser(user: any): Observable<any> {
    return this.userApi.create(user);
  }

  putLocation(location: any): Observable<any> {
    // return this.user.then( user =>{
    //   user = JSON.parse(user)
    //   console.log(user)
    //   return this.userApi.updateLocation(user.id, location)
    // }).catch( err => {
    //   return null
    // })
    
    return from (this.user).pipe(mergeMap(user => {
      let u:any
      u = user
      u = JSON.parse(u)
      return this.userApi.updateLocation(u.id, location)
    }))
    
  }

}
