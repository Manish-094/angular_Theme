import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { apiUrl } from 'app/api/constant';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService implements Resolve<any> {
  public rows : any;
  public onUserListChanged : BehaviorSubject<any>;

 /**
  * 
  * @param _httpClient 
  */

  constructor(private _httpClient: HttpClient ) {
      this.onUserListChanged = new BehaviorSubject({});
   }

  /**
   * 
   * @param route 
   * @param state 
   * @returns 
   */

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    }); 
  }

/**
 * get rows
 * @returns 
 */

private userListUrl = apiUrl+"/users/users-list";

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('userListUrl').subscribe((response: any) => {
        this.rows = response;
       console.log(this.rows);
        
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  
}
