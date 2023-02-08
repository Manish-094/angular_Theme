import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserListService } from './user/user-list.service';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
   {path:'user-list',component:UserListComponent 
  }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
