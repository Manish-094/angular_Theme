import { HttpClient} from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGINURL,  REGISTRATIONURL } from 'app/api/constant';
import { ToastrService } from 'ngx-toastr';
import {  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    return this.http.post(REGISTRATIONURL,person).pipe(
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
    return this.http.post(LOGINURL,person).pipe(
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
//  ResetPassword(data:ForgotPasswordModel):Observable<any>{
//     return this.http.post(passwordResetUrl,data).pipe(
//       map((data)=>{
//         console.log(" reset data send");
//         return data;
//       }),
//       catchError((err)=>{
//         throw err;
//       })
//     )
//  }

 setRole(){
  const curr_uer = JSON.parse( localStorage.getItem('currentUser'));
  // if(curr_uer.user.user_type == 2){
  //    curr_uer.role = "User";
  // }
  if(curr_uer.user.user_type == 1){
    curr_uer.role = "ADMIN";
  }
  else if(curr_uer.user.user_type == 2){
    curr_uer.role = "DELIVERY_MANAGER";
  }
  else if(curr_uer.user.user_type == 11){
    curr_uer.role = "HR_MANAGER";
  }
  else if(curr_uer.user.user_type == 9){
    curr_uer.role = "NETWORK_HEAD"
  }
  else if(curr_uer.user.user_type == 10){
    curr_uer.role = "ACCOUNT_HEAD"
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


