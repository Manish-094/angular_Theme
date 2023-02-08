import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AuthGuard } from './guards/auth.guard';
import { GoToFormGuard } from './guards/go-to-form.guard';
import { VerticalLayoutComponent } from './layout/vertical/vertical-layout.component';


const routes: Routes = [
 
  {path:'auth',loadChildren:()=>import("./auth/auth.module").then(mod=>mod.AuthModule)},
  
  // {path:'dashboard',component:VerticalLayoutComponent,canActivate:[AuthGuard]},
  {path:'user',loadChildren:()=>import("./main/main.module").then(mod=>mod.MainModule)},
  
  {path:'',redirectTo:'',pathMatch:'full'},

]; // sets up routes constant where you define your routes


// configures NgModule imports and exports
@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }