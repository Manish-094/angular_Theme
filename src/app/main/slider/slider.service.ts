import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { allSliderUrl, deleteSlideUrl, editSlidrUrl, getsliderUrl, sliderUrl } from 'app/api/constant';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
    return this._httpService.post(sliderUrl,formData
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
    return this._httpService.get(getsliderUrl+id).pipe(map((data)=>{
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
    return this._httpService.get(allSliderUrl).pipe(map((data)=>{
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
    return this._httpService.delete(deleteSlideUrl+id).pipe(map((res:any)=>{
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
    return this._httpService.put(editSlidrUrl+id,data).pipe(map((res)=>{
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


