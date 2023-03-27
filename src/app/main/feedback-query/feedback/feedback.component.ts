import { Status } from 'app/auth/models/status.enum';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from '../services/feedback.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { 
  Component, 
  OnInit, 
  ViewChild, 
  ViewEncapsulation 
} from '@angular/core';
import { user_type } from 'app/auth/models/user_type.enum';
import { department } from 'app/auth/models/department.enum';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FeedbackComponent implements OnInit {
  
  //decorator
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;


  //variables
  isFormValid : boolean = false
  query_id:any
  feedbackUpdateForm !:FormGroup
  public sidebarToggleRef = false;
  public rows : any;
  public assign_value:any;
  public selected = [];
  public selectedOption:number = 5;
  public ColumnMode = ColumnMode;
  public rowsCount;
  public role_value;
  public status_value;
  public department_value;
  public searchValue = new FormControl();
  public params = new HttpParams;




  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService,
    private _fb:FormBuilder,
    private modalService:NgbModal
    ) { }


  //life cycle hook
  ngOnInit(): void {
    this.getfeedbackData();
    this.searchFilter()

     this.feedbackUpdateForm = this._fb.group({
      status:['',Validators.required],
      feedback_remark:['',Validators.required]
     })
   }
 
   //form controls
   get f(){
     return this.feedbackUpdateForm.controls;
   }

 
   //for description
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  //feedback data
 getfeedbackData(params = {}){
  this._feedbackService.getAllFeedbackData(params).subscribe((res)=>{
    if(res.status == 1){
      if(res.data == null){
        this.rows = [];
        this.rowsCount = 0;
        this._toastr.error(res.message)
      }
      else{
        this.rows = res.data.data;
        this.rowsCount = res.data.total;
      }
    }
    this.setStatus();

  })
}



//pagination
page(event){
this.params = this.params
.set('page', event.offset+1)
.set('limit', this.selectedOption)
this.getfeedbackData(this.params)
  
}


//SET STATUS
setStatus(){
  this.rows.forEach(row=>{
   switch(row.status_log.slice(-1)[0].status){
     case 1:
       return row.status = 'open'
     case 2:
       return row.status = 'in_process'
     case 3:
       return row.status = 'closed'
     case 4:
       return row.status = 'confirmed'
     default:
       return  ''
   }
  })
 }


//search data
searchFilter() {
  this.searchValue.valueChanges
    .pipe(
      debounceTime(1500),
      switchMap((lastValue) => {
        this.params = this.params.delete("page");
        if(lastValue==''){
          this.params = this.params.delete("search");
        }
        else{
          this.params = this.params.set("search", lastValue);
        }
        return this._feedbackService.getAllFeedbackData(this.params).pipe(
          catchError(() => {
            this.rows = [];
            return [];
          })
        );
      })
    )
    .subscribe(
      (res: any) => {
        if(res.data==null){
          this.rows=[];
          this.rowsCount=0;
          this._toastr.error(res.message);
        } else {
          this.rows = res.data.data;
          this.rowsCount = res.data.total;
          // for set user-type,status,department
          this.rows.map((row) => {
            row.department = department[row.department];
            row.user_type = user_type[row.user_type];
            row.status = Status[row.status_log.slice(-1)[0].status];
          });
        }
      }
    );
}



//get total data
totalData() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.getfeedbackData(params)
}


  // modal Basic
  modalOpen(modalBasic,status:any,id:any) {
    this.modalService.open(modalBasic);
    this.query_id = id    
    this.feedbackUpdateForm = this._fb.group({
      status:[Status[status],Validators.required],
      feedback_remark:[null]
     })
  }

  
 


//delete feedback
deleteData(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this._feedbackService.deleteFeedbackData(id).subscribe(
        data => {
          if(data.status == 1){
            this._toastr.success("deleted successfully !")
          this.getfeedbackData(HttpParams)
          }
        }
      );
    }
  });
}


//submit login form
  onSubmit(data){
    this.isFormValid = true
    
      if(this.feedbackUpdateForm.valid){
        this._feedbackService.feedbackUpdate(this.query_id,data).subscribe(res=>{
          if(res.status == 1){
            this._toastr.success("updated successfully!")
            this.feedbackUpdateForm.reset()
            this.getfeedbackData(HttpParams)
            this.modalService.dismissAll()
          }
        })
      }
  }

}
