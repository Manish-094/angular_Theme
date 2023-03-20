import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map } from 'rxjs/operators';
import { 
  ALLSLIDERURL, 
  DELETESLIDERURL, 
  GETSLIDERURL, 
  SLIDERURL } 
  from 'app/api/constant';


@Injectable({
  providedIn: 'root'
})
export class SliderService implements OnInit {
  @BlockUI() blockUI:NgBlockUI;

  constructor(private _httpService:HttpClient,private _toastr:ToastrService) { }
  ngOnInit(){

  }

  /**
   * add/send slider to api
   */

  sliderData(formData:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._httpService.post(SLIDERURL,formData
    ).pipe(map((res:any)=>{
      this.blockUI.stop();
      return res;
    }),catchError((error) => {
      console.log(error);
      this.commonErrorHandler(error.status, error.error.message);
      throw error;
    }))
  }

  getSlider(id:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._httpService.get(GETSLIDERURL+id).pipe(map((data)=>{
      this.blockUI.stop();
      return data;
    }),catchError((error) => {
      console.log(error);
      this.commonErrorHandler(error.status, error.error.message);
      throw error;
    }))
  }
  /**
   * get all Slider
   */

  getAllSlider(data:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._httpService.get(ALLSLIDERURL).pipe(map((data)=>{
      this.blockUI.stop();
      return data;
    }),catchError((error) => {
      this.blockUI.stop();
      console.log(error);
      this.commonErrorHandler(error.status, error.error.message);
      throw error;
    }))
  }

  /**delete Slider */

  deleteData(id: string) {
    this.blockUI.start('Loading...');
    return this._httpService.delete(DELETESLIDERURL+id).pipe(map((res:any)=>{
      this.blockUI.stop();
      return res;
    }),catchError((error) => {
      this.blockUI.stop();
      console.log(error);
      this.commonErrorHandler(error.status, error.error.message);
      throw error;
    }))
  }

  /**
   * edit-slider data
   */

  editSlider(id:string,data:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._httpService.put(GETSLIDERURL+id,data).pipe(map((res)=>{
      this.blockUI.stop();
      return res;
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
      this._toastr.error(errorMessage);
    }
  }
}


