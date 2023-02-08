import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  forgotPassInput !: FormGroup;
  constructor(private userservice:UserService,private fb:FormBuilder) { }
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


