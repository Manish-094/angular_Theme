import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm !: FormGroup;
  isFormValid : boolean = false;
  passwordTextType: any;

get f(){
  return this.LoginForm.controls;
}

togglePasswordTextType() {
  this.passwordTextType = !this.passwordTextType;
}

  constructor(private fb:FormBuilder,private userservice:UserService,private router:Router,private toastrService:ToastrService,private _coreConfigService:CoreConfigService,private _authService:AuthenticationService) { 
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  ngOnInit(): void {
  //  this.userservice.reloadUser();
    this.LoginForm = this.fb.group({
      company_email:['', [Validators.required,Validators.email]],
      password:['', Validators.required],
      // user_type:['',Validators.required],
      // platform_os:['1',Validators.required]
    })
  }
  userLogin(data){
    
    this.isFormValid = true;
    if(this.LoginForm.valid){
      this.userservice.sendLoginData(data).subscribe((res)=>{
        if(res.status==1){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('currentUser',JSON.stringify(res.data));
          console.log(res);
          this.userservice.setRole();
          this.toastrService.success(res.message);
          this._authService.currentUserSubject.next(res.data)
          this.router.navigate(['main/dashboard']);
        }
      })
    }
}
}
