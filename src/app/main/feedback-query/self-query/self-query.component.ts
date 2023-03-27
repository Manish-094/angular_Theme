import Swal from 'sweetalert2';
import { Status } from 'app/auth/models/status.enum';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { FeedbackService } from '../services/feedback.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { department } from 'app/auth/models/department.enum';
import { user_type } from 'app/auth/models/user_type.enum';


@Component({
  selector: 'app-self-query',
  templateUrl: './self-query.component.html',
  styleUrls: ['./self-query.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SelfQueryComponent implements OnInit {

//decorator
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('myInput') myInput!: ElementRef
  @ViewChild(DatatableComponent) table: DatatableComponent;

  //variables
  query_id: any
  isFormValid: boolean = false
  feedbackUpdateForm !: FormGroup
  public rows: any;
  public assign_value: any;
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public rowsCount;
  public status_value;
  public selectedStatus = [];
  public searchValue = new FormControl();
  public params = new HttpParams;


  constructor(
    private _feedbackService: FeedbackService,
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private modalService: NgbModal
  ) { }


//life cycle hook
  ngOnInit(): void {
    this.getfeedbackData(HttpParams);
   this.searchFilter()
  }

//for description
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

//feedback data
  getfeedbackData(params) {
    this._feedbackService.singlefeedback(params).subscribe((res) => {
      if (res.status == 1) {
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

  //for pagination
  page(event) {
    this.params = this.params
      .set('page', event.offset + 1)
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
         return row.status = ''
     }
    })
   }


//for searching =>debounceTime
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
            catchError((error) => {
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
            if (data.status == 1) {
              this._toastr.success("deleted successfully !")
              this.getfeedbackData(HttpParams)
            }
          }
        );
      }
    });
  }

//send feedbackForm
  sendFeedback(){
    const params = new HttpParams()
    this.getfeedbackData(params)
  }

//submit login form
  onSubmit(data) {
    this.isFormValid = true

    if (this.feedbackUpdateForm.valid) {
      this._feedbackService.feedbackUpdate(this.query_id, data).subscribe(res => {
        if (res.status == 1) {
          this._toastr.success("updated successfully!")
          this.feedbackUpdateForm.reset()
          this.modalService.dismissAll()
          this.getfeedbackData(HttpParams)
        }
      })
    }
  }
}
