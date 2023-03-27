import { LoginUserModel } from '../models/login-user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, Role } from 'app/auth/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  public currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.getActiveUser();
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  get isNetworkHead(){
    return this.currentUser && this.currentUserSubject.value.role === Role.NETWORK_HEAD;
  }

  

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
 

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    // notify
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
  

  getActiveUser(){
    let currentUser: User;
    return currentUser;
  }

  //set role
// setRole(){
//   const user = JSON.parse(localStorage.getItem('currentUser'))
//   user.role = user_type[user.user_type]
//   this.currentUserSubject.next(user)
//   return localStorage.setItem('currentUser',JSON.stringify(user))
// }

}
