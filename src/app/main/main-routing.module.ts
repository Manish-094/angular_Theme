import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SliderComponent } from './slider/slider.component';


import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
   {path:'user-list',component:UserListComponent },
   {path:'dashboard',component:DashboardComponent},
   {path:'slider',component:SliderComponent},
   {path:'adminlist',component:AdminComponent}
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
