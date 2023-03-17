import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-assignes-to',
  templateUrl: './assignes-to.component.html',
  styleUrls: ['./assignes-to.component.scss']
})
export class AssignesToComponent implements OnInit {

  constructor(
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService) { }


  ngOnInit(): void {
    this._feedbackService.feedbackAssigned(HttpParams).subscribe(res=>{
      if(res.status==1){
        this._toastr.success(res.message)
        console.log(res,66)
      }
    })
  }

}
