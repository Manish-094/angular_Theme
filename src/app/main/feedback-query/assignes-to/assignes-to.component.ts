import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { FeedbackService } from '../services/feedback.service';

import { 
  Component, 
  ElementRef, 
  OnInit, 
  ViewChild, 
  ViewEncapsulation 
} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'app/status.enum';

@Component({
  selector: 'app-assignes-to',
  templateUrl: './assignes-to.component.html',
  styleUrls: ['./assignes-to.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignesToComponent implements OnInit {

  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('myInput') myInput!: ElementRef
  @ViewChild(DatatableComponent) table: DatatableComponent;

    // Public variable
    
  //variables
     isFormValid : boolean = false
     query_id:any
     feedbackUpdateForm !:FormGroup
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
    public data = '';
    public assignedData:any;
  

  constructor(
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService,
    private modalService: NgbModal,
    private _fb:FormBuilder) { }




//life cycle hook
  ngOnInit(): void {
    this.feedbackassignedData();
   
   }

    //for description
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


  //get feedback assigned data
   feedbackassignedData(params = {}){
    this._feedbackService.feedbackAssigned(params).subscribe(res=>{
      if(res.status == 1){
        this._toastr.success(res.message)
        this.rows = res.data.data;
        
        this.rowsCount = res.data.total;
        console.log(this.rowsCount,1000);
        console.log(this.rows,66)
        console.log(res,54)
      }
    this.setStatus(this.rows);
    this.setDepartment(this.rows);


    })
   }


   
//set departments
setDepartment(rows){
  this.rows.forEach((row)=>{
    if(row.assigned_department == 1){
      row.assigned_department = "ADMIN"  
    }
    else if(row.assigned_department == 2){
      row.assigned_department = 'HR'
    }
    else if(row.assigned_department == 3){
      row.assigned_department = 'ACCOUNT'
    }

   else if(row.assigned_department == 4){
      row.assigned_department = 'Mobile_Development'
    }
    else if(row.assigned_department == 5){
      row.assigned_department = 'FullStack_Development'
    }
    else if(row.assigned_department == 6){
      row.assigned_department = 'PHP_DEVELOPMENT'
    }
    else if(row.assigned_department == 7){
      row.assigned_department = 'ECOMMERCE_DEVELOPMENT'
    }
    else if(row.assigned_department == 8){
      row.assigned_department = 'DOTNET_DEVELOPMENT'
    }
    else if(row.assigned_department == 9){
      row.assigned_department = 'LIFERAY_DEVELOPMENT'
    }
    else if(row.assigned_department == 10){
      row.assigned_department = 'DESIGN'
    }
    else if(row.assigned_department == 11){
      row.assigned_department = 'QA'
    }
    else if(row.assigned_department == 12){
      row.assigned_department = 'NETWORK'
    }
    else if(row.assigned_department == 13){
      row.assigned_department = 'SALES'
    }
    else{
      row.assigned_department = "Others"
    }
  })
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

  //pagination
page(event){
  console.log(event.offset+1);
// this.getUserListData('page',event.offset+1)
const params = new HttpParams()
.set('page', event.offset+1)
.set('limit', this.selectedOption)
this.feedbackassignedData(params)
  
}


//get total data
totalData() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.feedbackassignedData(params)
}

  //searching debounceTime
ngAfterViewInit(): void {
  const searchItem = fromEvent<any>(this.myInput.nativeElement,'keyup')
  searchItem.pipe(map(data=>data.target.value),debounceTime(1000)).subscribe((res)=>{
    const  params = new HttpParams()
    .set('search',this.searchValue)
    this.feedbackassignedData(params)
  })
}


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

    // modal Open Vertically Centered
    modalOpenVC(modalVC,id:any) {
      this.modalService.open(modalVC, {
        centered: true
      });

      this._feedbackService.getAssignedquerydata(HttpParams).subscribe(res=>{
        if(res.status==1){
          // this._toastr.success("user data !");
          console.log(res,33)
          this.assignedData = res.data.data;
          console.log(this.assignedData,55)
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
        console.log(data,55)
        this.feedbackUpdateForm.reset()
        this.feedbackassignedData(HttpParams)
        this.modalService.dismissAll()
      }
    })
   }
   
}

}
