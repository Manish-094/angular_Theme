import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../passwordMatch.validators';
import { Person } from '../services/person';
import { UserService } from '../services/user.service';
import { createPasswordStrengthValidator } from '../strongPassword.validators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  contactForm !: FormGroup;
  isFormValid : boolean = false;
  passwordTextType: any;
  get f(){
    return this.contactForm.controls;
  }


  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  constructor(private router:Router, private fb:FormBuilder,private userservice:UserService,private toastr:ToastrService,private _coreConfigService:CoreConfigService) { 
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
   
    this.contactForm = this.fb.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      company:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)],createPasswordStrengthValidator],
      cnfpassword:['',Validators.required]
    },
    {
      validators: MustMatch('password','cnfpassword') 
    }
    )
  }


  UsersignUp(data: Person){

    this.isFormValid = true;
    // console.log(this.contactForm.valid,53);
    
    if(this.contactForm.valid){
      this.userservice.sendData(data).subscribe((res)=>{
        if(res.status==1){
          console.log(res);
          
          this.toastr.success(res.message);
           this.router.navigate(['/userAuth/login'])
        }
        else{
          console.error(res.err);
        }
      });
    }
 }
}
