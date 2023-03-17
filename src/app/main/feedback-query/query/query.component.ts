import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from '../services/feedback.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class QueryComponent implements OnInit {

  //public variable
  queryForm !: FormGroup
  isFormValid : boolean = false;
 
  constructor(
    private _fb:FormBuilder,
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService,
    private modalService: NgbModal) { }

  
    //get form controls
  get f(){
    return this.queryForm.controls;
  }

  ngOnInit(): void {
    this.queryForm =  this._fb.group({
      feedback_title:['',Validators.required],
      feedback_description:['',Validators.required],
      feedback_type:['',Validators.required]
    })
  }

  //submit form
  onSubmit(data:any){
    this.isFormValid = true;
   if(this.queryForm.valid){
    this._feedbackService.sendfeedbackData(data).subscribe(res=>{
      if(res.status == 1){
        this._toastr.success(res.message)
        console.log(res.data)
        this.queryForm.reset()
        this.modalService.dismissAll()
      }
    })
    
   }
  }


  //reset form
  reset(){
    this.queryForm.reset();
  }



  // modal Basic
  modalOpen(modalBasic) {
    this.modalService.open(modalBasic);
  }

  

}
