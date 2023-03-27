import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../services'; 
import { CoreConfigService } from '@core/services/config.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit{
//   LoginForm !: FormGroup;
//   isFormValid : boolean = false;
//   public passwordTextType: boolean;

// get f(){
//   return this.LoginForm.controls;
// }

//  /**
//    * Toggle password
//    */
//  togglePasswordTextType() {
//   this.passwordTextType = !this.passwordTextType;
// }

//   constructor(private fb:FormBuilder,private userservice:UserService,private router:Router,private toastrService:ToastrService,private _coreConfigService:CoreConfigService,private _authService:AuthenticationService) { 
//     this._coreConfigService.config = {
//       layout: {
//         navbar: {
//           hidden: true,
//         },
//         menu: {
//           hidden: true,
//         },
//         footer: {
//           hidden: true,
//         },
//         customizer: false,
//         enableLocalStorage: false,
//       },
//     };
//   }

//   ngOnInit(): void {
//   //  this.userservice.reloadUser();
//     this.LoginForm = this.fb.group({
//       company_email:['', [Validators.required,Validators.email]],
//       password:['', Validators.required],
//       // user_type:['',Validators.required],
//       // platform_os:['1',Validators.required]
//     })
//   }


//   userLogin(data){
    
//     this.isFormValid = true;
//     if(this.LoginForm.valid){
//       this.userservice.sendLoginData(data).subscribe((res)=>{
//         if(res.status==1){
//           localStorage.setItem('token',res.data.token);
//           localStorage.setItem('currentUser',JSON.stringify(res.data));
//           console.log(res);
//           this.userservice.setRole();
//           this.toastrService.success(res.message);
//           this._authService.currentUserSubject.next(res.data)
//           this.router.navigate(['main/dashboard']);
//         }
//       })
//     }
// }




//  Public
public coreConfig: any;
public loginForm: FormGroup;
public passwordTextType: boolean;
public isFormValid : boolean = false;




/**
 * Constructor
 *
 * @param {CoreConfigService} _coreConfigService
 */
constructor(
  private _coreConfigService: CoreConfigService,
  private _formBuilder: UntypedFormBuilder,
  private userservice:UserService,
  private router:Router,
  private toastrService:ToastrService,
  private _authService:AuthenticationService
) {


  


  // Configure the layout
  this._coreConfigService.config = {
    layout: {
      navbar: {
        hidden: true
      },
      menu: {
        hidden: true
      },
      footer: {
        hidden: true
      },
      customizer: false,
      enableLocalStorage: false
    }
  };
}

// Lifecycle Hooks

ngOnInit(): void {
  this.loginForm = this._formBuilder.group({
    company_email: ['networkhead@gmail.com', [Validators.required, Validators.email]],
    password: ['networkhead@123', Validators.required]
  });
}

// convenience getter for easy access to form fields
get f() {
  return this.loginForm.controls;
}

/**
 * Toggle password
 */
togglePasswordTextType() {
  this.passwordTextType = !this.passwordTextType;
}


//submit form
onSubmit() {
  this.isFormValid = true;
      if(this.loginForm.valid){
        this.userservice.sendLoginData(this.loginForm.value).subscribe((res)=>{
          if(res.status==1){
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('currentUser',JSON.stringify(res.data));
            console.log(res);
            this.userservice.setRole();
            this.toastrService.success(res.message);
            this._authService.currentUserSubject.next(res.data)
            this.router.navigate(['main/dashboard']);
             window.location.reload();
          }
        })
      }
  }
}

