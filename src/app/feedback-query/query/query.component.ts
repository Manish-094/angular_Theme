import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  queryForm !: FormGroup
  isFormValid : boolean = false;
  constructor(private _fb:FormBuilder,private _feedbackService:FeedbackService,private _toastr:ToastrService,private _coreSidebarService:CoreSidebarService,private modalService: NgbModal) { }

  get f(){
    return this.queryForm.controls;
  }

  ngOnInit(): void {
    this.queryForm =  this._fb.group({
      feedback_title:['',Validators.required],
      feedback_description:['',Validators.required]
    })
  }
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

  reset(){
    this.queryForm.reset();
  }

  toggleSidebar(name: any): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // modal Basic
  modalOpen(modalBasic) {
    this.modalService.open(modalBasic);
  }

}
