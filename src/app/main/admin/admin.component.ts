import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  public sidebarToggleRef = false;
  public rows : any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public rowsCount;
  public searchValue='';

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 1 },
    { name: 'Inactive', value: 2 }
  ];

    constructor(private _adminService:AdminService,private _toast:ToastrService,private _coreSidebarService:CoreSidebarService) { }


    //AdminList method
    getAdminListData(params){
      this._adminService.getAdminData(params).subscribe((res)=>{
        if(res.status == 1){
            console.log(res);
            this._toast.success(res.message)
            
        }
        this.setStatus(this.rows);
        // this.filterData(this.rows);
    
      })
    }
    
//set status for admin
    setStatus(rows){
      this.rows.forEach(row => {
        if(row.status == 1)
        {
          row.status = 'Active'
        }
        else if(row.status == 2){
          row.status = 'Inactive'
        }
        else{
          row.status = ''
        }
      });
    }

    page(event){
      console.log(event.offset+1);
    // this.getUserListData('page',event.offset+1)
    const params = new HttpParams()
    .set('page', event.offset+1)
    .set('limit', this.selectedOption)
    this.getAdminListData(params)
      
    }

//total data
totaldata(event) {
      const params = new HttpParams()
      .set('limit', this.selectedOption)
      this.getAdminListData(params)
    }
    

      /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    if(this.searchValue == undefined || this.searchValue == null){
      const params = new HttpParams()
      this.getAdminListData(params)
    }
    else{
      const  params = new HttpParams()
      .set('search',this.searchValue)
      this.getAdminListData(params)
    }
  }

   /**
     * Toggle the sidebar
     *
     * @param name
     */
   toggleSidebar(name: any): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  ngOnInit(): void {
    this.getAdminListData(HttpParams)
  }

}
