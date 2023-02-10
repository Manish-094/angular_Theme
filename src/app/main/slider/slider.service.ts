import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { apiUrl } from 'app/api/constant';
import { sliderData } from 'app/auth/services/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService implements OnInit {

  constructor(private _httpService:HttpClient) { }
  ngOnInit(){

  }

  private sliderUrl = apiUrl+"/slider/add-slider";

  sliderData(data:sliderData):Observable<any>{
    return this._httpService.post(this.sliderUrl,data);
  }
}
