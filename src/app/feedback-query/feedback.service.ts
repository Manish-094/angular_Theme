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
export class FeedbackService {
  @BlockUI() blockUI:NgBlockUI;
  constructor(private _http:HttpClient,private _toastr:ToastrService) { }
  createFeedbackUrl = apiUrl+"/feedback/create"     //create feedback
  getAllFeedback = apiUrl+"/feedback/get-all"        //all feedback data
  feedbackUpdaateUrl = apiUrl+"/feedback/update/"    // feedback update
  getFeedbackUrl = apiUrl+"/feedback/get"
  feedbackDeleteUrl = apiUrl+"/feedback/delete/"

  //create feedback

  sendfeedbackData(queryData:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._http.post(this.createFeedbackUrl,queryData
    ).pipe(map((res:any)=>{
      this.blockUI.stop();
      return res;
    }),catchError((error) => {
      console.log(error);
      this.commonErrorHandler(error.status, error.error.message);
      throw error;
    }))
  }
 
  //get all feedback data
  getAllFeedbackData(params): Observable<any> {
    this.blockUI.start('Loading...');
      return this._http.get(this.getAllFeedback,{params}).pipe(map((data)=>{
        this.blockUI.stop();
        return data;
      }),catchError((error) => {
        this.blockUI.stop();
        console.log(error);
        this.commonErrorHandler(error.status, error.error.message);
        throw error;
      }));
}



//feedback update
feedbackUpdate(id:string,data:any):Observable<any>{
  this.blockUI.start('Loading...');
  return this._http.patch(this.feedbackUpdaateUrl+id,data).pipe(map(data=>{
    this.blockUI.stop();
    return data;
  }),catchError((error) => {
    this.blockUI.stop();
    console.log(error);
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//deleteFeedback
deleteFeedbackData(id:any):Observable<any>{
  this.blockUI.start('Loading...');
  return this._http.delete(this.feedbackDeleteUrl+id).pipe(map(data=>{
    this.blockUI.stop();
    return data;
  }),catchError((error) => {
    this.blockUI.stop();
    console.log(error);
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//get Singlefeedbac
singlefeedback():Observable<any>{
  this.blockUI.start('Loading...');
  return this._http.get(this.getFeedbackUrl).pipe(map(data=>{
    this.blockUI.stop();
    return data;
  }),catchError((error) => {
    this.blockUI.stop();
    console.log(error);
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//common error handaler
  public commonErrorHandler(errorStatus, errorMessage) {
    if (errorStatus !== null || errorStatus !== undefined) {
      this._toastr.error(errorMessage);
    }
  }

}
