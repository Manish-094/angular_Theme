import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoToFormGuard } from 'app/guards/go-to-form.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
{path:'login',component:LoginComponent,canActivate:[GoToFormGuard]},
{path:'register',component:RegistrationComponent,canActivate:[GoToFormGuard]},
{path:'resetPassword',component:ResetPasswordComponent,canActivate:[GoToFormGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
