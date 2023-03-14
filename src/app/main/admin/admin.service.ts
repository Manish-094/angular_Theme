import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'app/api/constant';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  @BlockUI()blockUI:NgBlockUI;
  constructor(private _http:HttpClient,private _toastrService:ToastrService) { }

  /**
   * Getting Admin Data
   */

  private adminListUrl = apiUrl+"/admin/admin-list";   //admin-list api url

  getAdminData(params):Observable<any>{
    this.blockUI.start('Loading...');
    return this._http.get(this.adminListUrl,{params}).pipe(map((data)=>{
      this.blockUI.stop();
      return data;
    }),catchError((error) => {
      this.blockUI.stop();
      console.log(error);
      this.commonErrorHandler(error.status, error.error.message);
      throw error;
    }))
  }


  //common error handler

  public commonErrorHandler(errorStatus, errorMessage) {
    if (errorStatus !== null || errorStatus !== undefined) {
      this._toastrService.error(errorMessage);
    }
  }
}
