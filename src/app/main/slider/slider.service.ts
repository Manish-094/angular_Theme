import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { apiUrl } from 'app/api/constant';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SliderService implements OnInit {

  constructor(private _httpService:HttpClient,private _toastr:ToastrService) { }
  ngOnInit(){

  }

  /**
   * add/send slider to api
   */

  private sliderUrl = apiUrl+"/slider/add-slider";
  sliderData(formData:any):Observable<any>{
    return this._httpService.post(this.sliderUrl,formData
    ).pipe(map((res:any)=>{
      return res;
    })).pipe(catchError(this.handleError));;
  }

  private getsliderUrl = apiUrl+"/slider/get-slider/";
  getSlider(id:any):Observable<any>{
    return this._httpService.get(this.getsliderUrl+id).pipe(map((data)=>{
      return data;
    })).pipe(catchError(this.handleError));
  }
  /**
   * get all Slider
   */

  private allSliderUrl = apiUrl+"/slider/get-slider";
  getAllSlider(data:any):Observable<any>{
    return this._httpService.get(this.allSliderUrl).pipe(map((data)=>{
      return data;
    })).pipe(catchError(this.handleError));;
  }

  /**delete Slider */

  private deleteSlideUrl = apiUrl+"/slider/delete-slider/";  // delete api url
  deleteData(id: string) {
    return this._httpService.delete(this.deleteSlideUrl+id).pipe(map((res:any)=>{
      return res;
    })).pipe(catchError(this.handleError));
  }

  /**
   * edit-slider data
   */

  private editSlidrUrl = apiUrl+"/slider/edit-slider/";   // edit-slider url
  editSlider(id:string,data:any):Observable<any>{
    return this._httpService.put(this.editSlidrUrl+id,data).pipe(map((res)=>{
      return res;
    })).pipe(catchError(this.handleError));

  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      this._toastr.error(error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this._toastr.error( `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`)
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  };
}


