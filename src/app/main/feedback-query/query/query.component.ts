import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from '../services/feedback.service';
import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class QueryComponent implements OnInit {

  @Output() addFeedback = new EventEmitter<any>();

  //public variable
  queryForm !: FormGroup
  isFormValid : boolean = false;
  public ReactiveUDFormSubmitted = false;
 
  constructor(
    private _fb:FormBuilder,
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService,
    private modalService: NgbModal) { }

//life cycle hook
  ngOnInit(): void {
    this.queryForm =  this._fb.group({
      feedback_title:['',Validators.required],
      feedback_description:['',Validators.required],
      feedback_type:['',Validators.required]
    })
  }


  
//get form controls
  get f(){
    return this.queryForm.controls;
  }
  
  
//submit form
  onSubmit(data:any){
    this.ReactiveUDFormSubmitted = true;
    if (this.queryForm.invalid) {
      return;
    }
   else{
    this._feedbackService.sendfeedbackData(data).subscribe(res=>{
      if(res.status == 1){
        this._toastr.success(res.message)
        this.queryForm.reset()
        this.modalService.dismissAll()
        this.ReactiveUDFormSubmitted = false;
        this.addFeedback.emit();
      }
    })
    
   }
  }


//reset form
  reset(){
    this.queryForm.reset();
    this.ReactiveUDFormSubmitted = false;
  }
  
  
// modal Basic
  modalOpen(modalBasic) {
    this.modalService.open(modalBasic);
  }
}
