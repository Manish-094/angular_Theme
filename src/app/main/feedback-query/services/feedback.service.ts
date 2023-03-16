import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createFeedbackUrl, feedbackAssignedTo, feedbackDeleteUrl, feedbackUpdaateUrl, getAllFeedback, getFeedbackUrl } from 'app/api/constant';
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



  //create feedback

  sendfeedbackData(queryData:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._http.post(createFeedbackUrl,queryData
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
      return this._http.get(getAllFeedback,{params}).pipe(map((data)=>{
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
  return this._http.patch(feedbackUpdaateUrl+id,data).pipe(map(data=>{
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
  return this._http.delete(feedbackDeleteUrl+id).pipe(map(data=>{
    this.blockUI.stop();
    return data;
  }),catchError((error) => {
    this.blockUI.stop();
    console.log(error);
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//get Singlefeedback
singlefeedback(params):Observable<any>{
  this.blockUI.start('Loading...');
  return this._http.get(getFeedbackUrl,{params}).pipe(map(data=>{
    this.blockUI.stop();
    return data;
  }),catchError((error) => {
    this.blockUI.stop();
    console.log(error);
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//feedback Assigned data
feedbackAssigned(params):Observable<any>{
  this.blockUI.start('Loading...');
   return this._http.get(feedbackAssignedTo,{params}).pipe(map(data=>{
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
