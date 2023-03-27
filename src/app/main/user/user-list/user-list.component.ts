import { fromEvent } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { UserListService } from '../user-list.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { 
  Component, 
  ElementRef, 
  OnInit, 
  ViewChild, 
  ViewEncapsulation
 } from '@angular/core';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  
  @ViewChild('myInput') myInput!: ElementRef

  // Public
  public sidebarToggleRef = false;
  public rows : any;
  public selectedOption = 5;
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
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _userListService: UserListService,
    private _coreSidebarService: CoreSidebarService,
    private _toastr:ToastrService
  ) {
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------


//getting user list datas  
getUserListData(params){
  this._userListService.getDataTableRows(params).subscribe((res)=>{
    if(res.status == 1){
      // this._toastr.success(res.message)
    
      if(res.data == null){
        this.rows = [];
        this.rowsCount = 0;
        this._toastr.error(res.message)
      }
      else{
        this.rows = res.data.data;
        this.rowsCount = res.data.total;
      }      
      console.log(res,54)
    }
    this.setRole(this.rows);
    this.setDepartment(this.rows);
  })
}

//pagination
page(event){
  console.log(event.offset+1);
// this.getUserListData('page',event.offset+1)
const params = new HttpParams()
.set('page', event.offset+1)
.set('limit', this.selectedOption)
this.getUserListData(params)
  
}

//set role
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


//set departments
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


//get total data
Totaldata() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.getUserListData(params)
}



ngAfterViewInit(): void {
    const searchItem = fromEvent<any>(this.myInput.nativeElement,'keyup')
    searchItem.pipe(map(data=>data.target.value),debounceTime(1000)).subscribe((res)=>{
      const  params = new HttpParams()
      .set('search',this.searchValue)
      this.getUserListData(params)
    })
}

  filterByDepartment(event: { value: string | number | boolean; }){
    const params = new HttpParams().set('department',event.value)
    this.getUserListData(params)
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
        this.getUserListData(params)
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
       this.getUserListData(params)
       this.status_value = event.value;
    }

      /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  


 
  ngOnInit(): void {
  
   this.getUserListData(HttpParams);
 

  }
}
