import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { USERLISTURL } from 'app/api/constant';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { 
  ActivatedRouteSnapshot, 
  Resolve, 
  RouterStateSnapshot 
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserListService implements Resolve<any> {
  @BlockUI() blockUI:NgBlockUI;

  public rows : any;
  public onUserListChanged : BehaviorSubject<any>;

 /**
  * 
  * @param _httpClient 
  */

  constructor(
    private _httpClient: HttpClient,
    private __toastr:ToastrService ) {
      this.onUserListChanged = new BehaviorSubject({});
   }

  /**
   * 
   * @param route 
   * @param state 
   * @returns 
   */

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):Observable<any> | Promise<any> | any {
    
  }

/**
 * get rows
 * @returns 
 */




     getDataTableRows(params): Observable<any> {
    this.blockUI.start('Loading...');
      return this._httpClient.get(USERLISTURL,{params}).pipe(map((data)=>{
        this.blockUI.stop();
        return data;
      }),catchError((error) => {
        this.blockUI.stop();
        console.log(error);
        this.commonErrorHandler(error.status, error.error.message);
        throw error;
      }));
}

//common error handler
public commonErrorHandler(errorStatus, errorMessage) {
  if (errorStatus !== null || errorStatus !== undefined) {
    this.__toastr.error(errorMessage);
  }
}
}