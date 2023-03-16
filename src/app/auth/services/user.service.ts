import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginUrl, passwordResetUrl, registrationUrl } from 'app/api/constant';
import { ToastrService } from 'ngx-toastr';
import {  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ForgotPasswordModel } from '../models';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  toastrService: any;
  isLoggedIn = false;

  UserLogin(value: any) {
    throw new Error('Method not implemented.');
  }
ngOnInit(): void {
  
}
  

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService){}



  
  /**
   * 
   * @param person 
   * @returns 
   * sennd signUp data to server
   */

  sendData(person:Person):Observable<any>{
    return this.http.post(registrationUrl,person).pipe(
      map((data)=>{
        console.log("data send");
        return data;
      }),
      catchError((err)=>{
        console.error(err);
        throw err;
      })
    )
  }

  /**
   * 
   * @param person 
   * @returns 
   * sending login data to server
   */

  sendLoginData(person:Person):Observable<any>{
    return this.http.post(loginUrl,person).pipe(
      map((data)=>{
        this.isLoggedIn = true;
        return data;
      }),
      catchError((err)=>{
        console.log(err);
        throw err;
      })
    )
  }

  

  /**
   * Reset password
   */
 ResetPassword(data:ForgotPasswordModel):Observable<any>{
    return this.http.post(passwordResetUrl,data).pipe(
      map((data)=>{
        console.log(" reset data send");
        return data;
      }),
      catchError((err)=>{
        throw err;
      })
    )
 }

 setRole(){
  const curr_uer = JSON.parse( localStorage.getItem('currentUser'));
  if(curr_uer.user.user_type == 2){
     curr_uer.role = "User";
  }
  else if(curr_uer.user.user_type == 1){
    curr_uer.role = "Admin";
  }

  localStorage.setItem("currentUser", JSON.stringify(curr_uer))
  // this.toastr.success(res.message);
  // this.router.navigate(['']);
 }

 canactivate(){
  const token = localStorage.getItem('token');
  if(token == undefined || token == null){
    return false;
  }
  else{
    return true;
  }
 }

}


