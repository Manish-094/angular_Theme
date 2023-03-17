import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { FeedbackService } from '../services/feedback.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { 
  Component, 
  ElementRef,
   OnInit, 
   ViewChild, 
   ViewEncapsulation 
  } from '@angular/core';


@Component({
  selector: 'app-self-query',
  templateUrl: './self-query.component.html',
  styleUrls: ['./self-query.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SelfQueryComponent implements OnInit {
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('myInput') myInput!: ElementRef
  @ViewChild(DatatableComponent) table: DatatableComponent;


  query_id:any



  constructor(
    private _feedbackService:FeedbackService,
    private _toastr:ToastrService) { }

  // Public
  public rows : any;
  public assign_value:any;
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public rowsCount;
  public status_value;
  public selectedStatus = [];
  public searchValue = '';



 
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  //feedback data
 getFeedbackData(params){
  this._feedbackService.singlefeedback(params).subscribe((res)=>{
    if(res.status == 1){
      // this._toastr.success("user list get successfully")
      this.rows = res.data.data;
      console.log(this.rows,444)
      this.rowsCount = res.data.total;
     
    }
    // this.setRole(this.rows);
    // this.setDepartment(this.rows);
    this.setStatus(this.rows);

  })
}

page(event){
  console.log(event.offset+1);
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

//for searching =>debounceTime
ngAfterViewInit(): void {
    const searchItem = fromEvent<any>(this.myInput.nativeElement,'keyup')
    searchItem.pipe(map(data=>data.target.value),debounceTime(1000)).subscribe((res)=>{
      const  params = new HttpParams()
      .set('status',this.status_value)
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
  

  ngOnInit(): void {
   this.getFeedbackData(HttpParams);
  
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

}
