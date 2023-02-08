import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'app/api/constant';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../helpers';
import { ForgotPasswordModel } from '../models';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  toastrService: any;
  UserLogin(value: any) {
    throw new Error('Method not implemented.');
  }
ngOnInit(): void {
  
}
  // isLoginError = new EventEmitter<boolean>(false);
  // isUserLogedIn = new BehaviorSubject<boolean>(false);
    // islogged:boolean = false;
  // user:any;
  // constructor(private http:HttpClient,private router:Router) { }

  // UserSignUp(user:any){
  //   this.http.post("http://137.184.19.129:4001/v1/users/signUp",user,{observe:'response'}).subscribe((result)=>{
  //     if(result){
  //       // this.isUserLogedIn.next(true);
  //       localStorage.setItem('user',JSON.stringify(result.body));
  //       this.router.navigate(['/userAuth/login'])
  //     }
  //   })
  // }

  // UserLogin(data:any){
  //   this.http.get<any>(`http://localhost:3000/User?email=${data.emailId}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
  //     if(result && result.body && result.body.length){
  //       this.isLoginError.emit(false);
  //       localStorage.setItem('user', JSON.stringify(result.body[0]))
  //       // this.isUserLogedIn.next(true);
  //       localStorage.setItem('token','true');
  //       this.islogged = true;
  //       this.router.navigate([''])
  //     }
  //     else{
  //       this.isLoginError.emit(true);
  //     }
  //   })
  // }
  // // reloadUser(){
  //   if(localStorage.getItem('user')){
  //     // this.isUserLogedIn.next(true);
  //     this.islogged = true;
  //     this.router.navigate(['/main/dashboard'])
  //   }
  // }

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService){}

  /**
   * urls
   */
  private registrationUrl = apiUrl+"/users/signUp"; //url for signUp api
  private loginUrl = apiUrl+"/users/login";         //url for login api
  private passwordResetUrl = apiUrl+"/users/forgot-password"; //url for resetPassword

  
  /**
   * 
   * @param person 
   * @returns 
   * sennd signUp data to server
   */

  sendData(person:Person):Observable<any>{
    return this.http.post(this.registrationUrl,person).pipe(
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
    return this.http.post(this.loginUrl,person).pipe(
      map((data)=>{
        
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
    return this.http.post(this.passwordResetUrl,data).pipe(
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
  if(curr_uer.user_type == 2){
     curr_uer.role = "User";
  }
  else if(curr_uer.user_type == 1){
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


