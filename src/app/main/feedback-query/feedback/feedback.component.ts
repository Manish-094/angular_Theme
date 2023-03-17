import { fromEvent } from 'rxjs';
import { Status } from 'app/status.enum';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from '../services/feedback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2';
import { 
  Component, 
  ElementRef, 
  OnInit, 
  ViewChild, 
  ViewEncapsulation 
} from '@angular/core';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FeedbackComponent implements OnInit {
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('myInput') myInput!: ElementRef
  @ViewChild(DatatableComponent) table: DatatableComponent;


  //variables
  isFormValid : boolean = false
  query_id:any
  feedbackUpdateForm !:FormGroup




  // Public variable
  public sidebarToggleRef = false;
  public rows : any;
  public assign_value:any;
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public rowsCount;
  public role_value;
  public status_value;
  public department_value;
  public searchValue = '';




  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService,
    private _coreSidebarService:CoreSidebarService,
    private _fb:FormBuilder,
    private modalService:NgbModal
    ) { }

  ngOnInit(): void {
    this.getFeedbackData();
    // this.feedbackAssignedData();
   
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
 getFeedbackData(params = {}){
  this._feedbackService.getAllFeedbackData(params).subscribe((res)=>{
    if(res.status == 1){
      this._toastr.success(res.message)
      this.rows = res.data.data;
      
      this.rowsCount = res.data.total;
      console.log(this.rowsCount,1000);
      console.log(this.rows,66)
      console.log(res,54)
    }
    this.setStatus(this.rows);
    // this.filterData(this.rows);

  })
}


//pagination
page(event){
  console.log(event.offset+1);
// this.getUserListData('page',event.offset+1)
const params = new HttpParams()
.set('page', event.offset+1)
.set('limit', this.selectedOption)
this.getFeedbackData(params)
  
}


//SET STATUS

setStatus(rows){
this.rows.forEach(row => {
  if(row.status == 1){
    row.status = "open"
  }
  else if(row.status == 2){
    row.status = "in_process"
  }
  else if(row.status == 3){
    row.status = "closed"
  }
  else{
    row.status = "confirmed"
  }
})
}

//searching debounceTime
ngAfterViewInit(): void {
    const searchItem = fromEvent<any>(this.myInput.nativeElement,'keyup')
    searchItem.pipe(map(data=>data.target.value),debounceTime(1000)).subscribe((res)=>{
      const  params = new HttpParams()
      .set('search',this.searchValue)
      this.getFeedbackData(params)
    })
}



//get total data
Totaldata() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.getFeedbackData(params)
}

  /**
   * filterUpdate
   */
  filterUpdate(event) {
    const  params = new HttpParams()
    .set('user_type',this.role_value)
    .set('status',this.status_value)
    .set('search',this.searchValue)
    this.getFeedbackData(params)
  }


    /**
   * Filter By Status
   *
   * @param event
   */
    filterByStatus(event: { value: any; }) {
      const params = new HttpParams().set('status',event.value)
      .set('user_type',this.role_value)
       this.getFeedbackData(params)
       this.status_value = event.value;
    }

      /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  

  // modal Basic
  modalOpen(modalBasic,status:any,id:any) {
    this.modalService.open(modalBasic);
    this.query_id = id
    // console.log(status);
    
    this.feedbackUpdateForm = this._fb.group({
      status:[Status[status],Validators.required],
      feedback_remark:[null]
     })
  }

  
  //feedback assign data
  feedbackAssignedData(params={}){
    this._feedbackService.feedbackAssigned(params).subscribe(res=>{
      if(res.status == 1){
        this._toastr.success("assigned data get successfully")
        console.log(res,22)
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
      
  console.log(id,99);
  
      
      this._feedbackService.deleteFeedbackData(id).subscribe(
        data => {
          console.log(data,100);
          this.getFeedbackData(HttpParams)
          
          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          );
        }
      );
    }
  });
}


//submit login form
  onSubmit(data){
    // this.isFormValid = true
    
      this._feedbackService.feedbackUpdate(this.query_id,data).subscribe(res=>{
        if(res.status == 1){
          this._toastr.success(res.message)
          console.log(data,55)
          this.feedbackUpdateForm.reset()
          this.getFeedbackData(HttpParams)
          this.modalService.dismissAll()
        }
      })
  }

}
