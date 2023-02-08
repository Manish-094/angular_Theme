import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'app/auth/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userservice:UserService,private router:Router,private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(localStorage.getItem('user')){
    //   return true;
    // }
    // return this.userservice.isUserLogedIn;
    // if(!this.userservice.islogged){
    //  this.router.navigate(['/userAuth/login']);
    // }
    // return this.userservice.islogged;
    // if(localStorage.getItem('token')=='true'){
    //   return true;
    // }
    // else{
    //     // alert("Login Required !")
    //     this.router.navigate(['/userAuth/login']);
    // }
    // if(localStorage.getItem('token')=='true'){
    //   return true;
    // }
    // else{
    //   this.router.navigate(['/userAuth/login']);
    // }
     if(this.userservice.canactivate()){
      return true;
     }
     else{
      this.router.navigate(['/auth/login']);
      return false;
     }
  }
  
}
