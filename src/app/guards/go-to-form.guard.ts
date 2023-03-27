import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'app/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoToFormGuard implements CanActivate {
  constructor(private router: Router,private userService:UserService,private toastrservice:ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.canactivate()){
      // this.toastrservice.warning("Already Logged in !")
      this.router.navigate(['/main/dashboard']);
      return false;
    }
    else{
      // this.toastrservice.warning("Found Unauthorised First Login !")
      return true;
    }
  }
  
}
