import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { 
  CREATEFEEDBACKURL, 
  FEEDBACKASSIGNEDTO, 
  FEEDBACKDELETEURL, 
  FEEDBACKUPDATEURL, 
  FEEDBACKUSER, 
  GETALLFEEDBACK, 
  GETFEEDBACKURL, 
  REASSIGNEDQUERYDATA
} from 'app/api/constant';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

//loader
  @BlockUI() blockUI:NgBlockUI;
  
  constructor(
    private _http:HttpClient,
    private _toastr:ToastrService) { }



  //create feedback

  sendfeedbackData(queryData:any):Observable<any>{
    this.blockUI.start('Loading...');
    return this._http.post(CREATEFEEDBACKURL,queryData
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
      return this._http.get(GETALLFEEDBACK,{params}).pipe(map((data)=>{
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
  return this._http.patch(FEEDBACKUPDATEURL+id,data).pipe(map(data=>{
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
  return this._http.delete(FEEDBACKDELETEURL+id).pipe(map(data=>{
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
  return this._http.get(GETFEEDBACKURL,{params}).pipe(map(data=>{
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
   return this._http.get(FEEDBACKASSIGNEDTO,{params}).pipe(map(data=>{
    this.blockUI.stop();
    return data;
   }),catchError((error) => {
    this.blockUI.stop();
    console.log(error);
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//get aassignedUser of the department
assigneduserDepartment(id:any,data?:undefined):Observable<any>{
  this.blockUI.start('Loading...');
  return this._http.post(FEEDBACKUSER+id,data).pipe(map(data=>{
    this.blockUI.stop();
    return data
  }),catchError((error) => {
    console.log(error);
    this.blockUI.stop();
    this.commonErrorHandler(error.status, error.error.message);
    throw error;
  }))
}

//post re-assigned query data
postReassignedquerydata(id:any,data:any):Observable<any>{
  this.blockUI.start('Loading...');
  return this._http.post(REASSIGNEDQUERYDATA+id,data).pipe(map(data=>{
    this.blockUI.stop();
    return data
  }),catchError((error) => {
    console.log(error);
    this.blockUI.stop();
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
