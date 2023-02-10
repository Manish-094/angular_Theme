import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SliderComponent } from './slider/slider.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';


import { UserListService } from './user/user-list.service';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
   {path:'user-list',component:UserListComponent },
   {path:'dashboard',component:DashboardComponent},
   {path:'slider',component:SliderComponent},
   {path:'user-edit',component:UserEditComponent}
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
