import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {


  // Public
  public sidebarToggleRef = false;
  public rows : any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  public rowsCount;
  public role_value;
  public status_value;

  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 1 },
    { name: 'User', value: 2 }
  ];

  public selectPlan: any = [
    { name: 'All', value: '' },
    { name: 'Basic', value: 'Basic' },
    { name: 'Company', value: 'Company' },
    { name: 'Enterprise', value: 'Enterprise' },
    { name: 'Team', value: 'Team' }
  ];

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 1 },
    { name: 'Inactive', value: 2 }
  ];
  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

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
    private _coreConfigService: CoreConfigService,
    private _toastr:ToastrService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  
getUserListData(params){
  this._userListService.getDataTableRows(params).subscribe((res)=>{
    if(res.status == 1){
      // this._toastr.success(res.message)
      this.rows = res.data.data;
      this.rowsCount = res.data.total;
      console.log(this.rowsCount,1000);
      
      
    }
    this.setRole(this.rows);
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
this.getUserListData(params)
  
}

/**
 * common filter by role and status function 
 */



setRole(rows){
  this.rows.forEach(row => {
    if(row.user_type == 2){
      row.role = "User"  
    }
    else{
      row.role = 'Admin'
    }

  });
}

setStatus(rows){
  this.rows.forEach(row => {
    if(row.status == 1)
    {
      row.status = 'active'
    }
    else if(row.status == 2){
      row.status = 'inactive'
    }
    else{
      row.status = 'pending'
    }
  });
}


Totaldata() {
  const params = new HttpParams()
  .set('limit', this.selectedOption)
  this.getUserListData(params)
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
    this.getUserListData(params)
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
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event: { value: any; }) {
   
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
  


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
  /**
   * status checking
   */
   this.getUserListData(HttpParams);
 

  /**
   * role checking
   */



  /**
   * filter by status
   */

  


    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
            // this.rowsCount = this.rows.data.total;
            console.log(this.rows.data);
            this.tempData = this.rows;
          });
        }, 450);
      } else {
        this._userListService.onUserListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.rows = response;
          // this.rowsCount = this.rows.data.total;
          this.tempData = this.rows;
        });
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
