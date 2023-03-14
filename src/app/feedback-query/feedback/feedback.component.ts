import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../feedback.service';
import { HttpParams } from '@angular/common/http';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'app/status.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FeedbackComponent implements OnInit {
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('querycomponent') quwery:any
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  isFormValid : boolean = false
  query_id:any

  constructor(private _feedbackService:FeedbackService,private _toastr:ToastrService,private _coreSidebarService:CoreSidebarService,private _fb:FormBuilder,private modalService:NgbModal) { }

  // Public
  public sidebarToggleRef = false;
  public rows : any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public rowsCount;
  public role_value;
  public status_value;
  public department_value;

  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'ADMIN', value: 1 },
    { name: 'DELIVERY_MANAGER', value: 2 },
    { name: 'ACCOUNTS', value: 3 },
    { name: 'HR', value: 4 },
    { name: 'PM', value: 5 },
    { name: 'TL', value: 6 },
    { name: 'USER', value: 7 },
  ];

  public selectDepartment: any = [
    { name: 'All', value: '' },
    { name: 'ADMIN', value: 1 },
    { name: 'HR', value: 2 },
    { name: 'ACCOUNT', value: 3 },
    { name: 'MOBILE_DEVELOPMENT', value: 4 },
    { name: 'FULLSTACK_DEVELOPMENT', value: 5 },
    { name: 'PHP_DEVELOPMENT', value: 6 },
    { name: 'ECOMMERCE_DEVELOPMENT', value: 7 },
    { name: 'DOTNET_DEVELOPMENT', value: 8 },
    { name: 'LIFERAY_DEVELOPMENT', value: 9 },
    { name: 'DESIGN', value: 10},
    { name: 'QA', value: 11},
    { name: 'NETWORK', value: 12},
    { name: 'SALES', value: 13},
  ];



  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 1 },
    { name: 'Inactive', value: 2 }
  ];
  public selectedRole = [];
  public selectedStatus = [];
  public selectedDepartment=[];
  public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;



  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   */


  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  
 getFeedbackData(params){
  this._feedbackService.getAllFeedbackData(params).subscribe((res)=>{
    if(res.status == 1){
      this._toastr.success(res.message)
      this.rows = res.data.data;
      this.rowsCount = res.data.total;
      console.log(this.rowsCount,1000);
      console.log(this.rows,66)
      console.log(res,54)
    }
    this.setRole(this.rows);
    this.setDepartment(this.rows);
    this.setStatus(this.rows);
    // this.filterData(this.rows);

  })
}

page(event){
  console.log(event.offset+1);
// this.getUserListData('page',event.offset+1)
const params = new HttpParams()
.set('page', event.offset+1)
.set('limit', this.selectedOption)
this.getFeedbackData(params)
  
}

/**
 * common filter by role and status function 
 */


//SET ROLE
setRole(rows){
  this.rows.forEach(row => {
    if(row.user_type == 1){
      row.role = "Admin"  
    }
    else if(row.user_type == 2){
      row.role = 'Delivery_Manager'
    }
    else if(row.user_type == 3){
      row.role = 'Accounts'
    }

   else if(row.user_type == 4){
      row.role = 'HR'
    }
    else if(row.user_type == 5){
      row.role = 'PM'
    }
    else if(row.user_type == 6){
      row.role = 'TL'
    }
    else if(row.user_type == 7){
      row.role = 'User'
    }
    else{

      row.role = "Others"
    }

  });
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

@ViewChild('myInput') myInput!: ElementRef
ngAfterViewInit(): void {
    const searchItem = fromEvent<any>(this.myInput.nativeElement,'keyup')
    searchItem.pipe(map(data=>data.target.value),debounceTime(1000)).subscribe((res)=>{
      const  params = new HttpParams()
      .set('user_type',this.role_value)
      .set('status',this.status_value)
      .set('search',this.searchValue)
      this.getFeedbackData(params)
    })
}

setDepartment(rows){
  this.rows.forEach((row)=>{
    if(row.department == 1){
      row.department = "Admin"  
    }
    else if(row.department == 2){
      row.department = 'HR'
    }
    else if(row.department == 3){
      row.department = 'Accounts'
    }

   else if(row.department == 4){
      row.department = 'Mobile_Development'
    }
    else if(row.department == 5){
      row.department = 'FullStack_Development'
    }
    else if(row.department == 6){
      row.department = 'PHP_DEVELOPMENT'
    }
    else if(row.department == 7){
      row.department = 'ECOMMERCE_DEVELOPMENT'
    }
    else if(row.department == 8){
      row.department = 'DOTNET_DEVELOPMENT'
    }
    else if(row.department == 9){
      row.department = 'LIFERAY_DEVELOPMENT'
    }
    else if(row.department == 10){
      row.department = 'DESIGN'
    }
    else if(row.department == 11){
      row.department = 'QA'
    }
    else if(row.department == 12){
      row.department = 'NETWORK'
    }
    else if(row.department == 13){
      row.department = 'SALES'
    }
    else{
      row.department = "Others"
    }
  })
}


Totaldata() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.getFeedbackData(params)
}

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const  params = new HttpParams()
    .set('user_type',this.role_value)
    .set('status',this.status_value)
    .set('search',this.searchValue)
    this.getFeedbackData(params)
  }

  

  filterByDepartment(event: { value: string | number | boolean; }){
    const params = new HttpParams().set('department',event.value)
    this.getFeedbackData(params)
    this.department_value = event.value;
  }

  /**
     * Toggle the sidebar
     *
     * @param name
     */
  toggleSidebar(name: any): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

    /**
   * Filter By Roles
   *
   * @param event
   */
    filterByRole(event: { value: any; }) {

        
        const params = new HttpParams().set('user_type',event.value)
        this.getFeedbackData(params)
        this.role_value = event.value;
        // console.log(event.value);
        
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
    //  console.log("id = ",id)
    //  console.log("status=",status)
  }

 feedbackUpdateForm !:FormGroup
  ngOnInit(): void {
   this.getFeedbackData(HttpParams);
  
  }

  //form controls
  get f(){
    return this.feedbackUpdateForm.controls;
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
        },
        error => {
          Swal.fire(
            'Error!',
            'There was an error deleting the data.',
            'error'
          );
        }
      );
    }
  });
}

//user details
userDetail(id:any){
  this._feedbackService.singlefeedback().subscribe(res=>{
    if(res.status == 1){
      this._toastr.success(res.message)
      console.log(res,432)
    }
  })
}

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
