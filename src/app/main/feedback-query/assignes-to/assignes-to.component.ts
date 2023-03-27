import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { FeedbackService } from '../services/feedback.service';


import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { catchError, debounceTime,switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from 'app/auth/models/status.enum';
import { 
  Component, 
  OnInit, 
  ViewChild, 
  ViewEncapsulation 
} from '@angular/core';
import { department } from 'app/auth/models/department.enum';
import { user_type } from 'app/auth/models/user_type.enum';

@Component({
  selector: 'app-assignes-to',
  templateUrl: './assignes-to.component.html',
  styleUrls: ['./assignes-to.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignesToComponent implements OnInit {

//decorator
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

// Public variable    
     isFormValid : boolean = false
     query_id:any;
     user_id:any;
     feedbackUpdateForm !:FormGroup
     reassignForm !: FormGroup
    public sidebarToggleRef = false;
    public rows : any;
    public assign_value:any;
    public selectedOption = 5;
    public ColumnMode = ColumnMode;
    public rowsCount;
    public role_value;
    public status_value;
    public department_value;
    public data = '';
    public assignedData:any;
    public searchValue = new FormControl();
    public params = new HttpParams;
  
//constructor
  constructor(
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService,
    private modalService: NgbModal,
    private _fb:FormBuilder) { }


//life cycle hook
  ngOnInit(): void {
    this.feedbackassignedData();
    this.searchFilter();
    this.feedbackUpdateForm = this._fb.group({
      status:['',Validators.required],
      feedback_remark:['',Validators.required]
     })
     this.reassignForm = this._fb.group({
      assigned_to:['',Validators.required]
     })
   }

//for description
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


//get feedback assigned data
   feedbackassignedData(params = {}){
    this._feedbackService.feedbackAssigned(params).subscribe(res=>{
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
      this.rows.map((row) => {
        row.assigned_department = department[row.assigned_department];
       
      });
    this.setStatus(this.rows);
    })
   }


//serach
   searchFilter() {
    // for search
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
   



//SET STATUS
setStatus(rows){
   rows.forEach(row=>{
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
        return row.status = ''
    }
   })
  }

//pagination
page(event){
this.params = this.params
.set('page', event.offset+1)
.set('limit', this.selectedOption)
this.feedbackassignedData(this.params)
  
}


//get total data
totalData() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.feedbackassignedData(params)
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

// modal Open Vertically Centered
    modalOpenVC(modalVC,id:any) {
      this.modalService.open(modalVC, {
        centered: true
      });

      this._feedbackService.assigneduserDepartment(id).subscribe(res=>{
        if(res.status==1){
          this.user_id = id
          this.assignedData = res.data;
          console.log(this.assignedData)
        }
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
          this.feedbackassignedData(HttpParams)
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
        this._toastr.success(res.message)
        this.feedbackUpdateForm.reset()
        this.feedbackassignedData(HttpParams)
        this.modalService.dismissAll()
      }
    })
   }
   
}

//reassigned form submit
onSubmits(){
  // this.isFormValid = true

    this._feedbackService.postReassignedquerydata(this.user_id,[this.reassignForm.value]).subscribe(res=>{
      if(res.status == 1)
      {
        console.log(res)
        this._toastr.success(res.message)
        this.modalService.dismissAll()
      }
    })
}

}
