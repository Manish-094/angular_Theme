import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  forgotPassInput !: FormGroup;
  constructor(private userservice:UserService,private fb:FormBuilder,private _coreConfigService:CoreConfigService) { 
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
  get f(){
    return this.forgotPassInput.controls;
  }
  ngOnInit(): void {
    this.forgotPassInput = this.fb.group({
      email:['',[Validators.required]],
      user_type:['',[Validators.required]],
    })
    
  }

  resetData(data){
    console.log(data);
  }
}


