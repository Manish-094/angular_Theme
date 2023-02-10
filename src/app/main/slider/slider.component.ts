import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sliderData } from 'app/auth/services/person';
import { ToastrService } from 'ngx-toastr';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
data:any;
slderForm !: FormGroup;
  constructor(private _sliderService:SliderService,private fb:FormBuilder,private _tostr:ToastrService) { }



  ngOnInit(): void {
     this.slderForm =  this.fb.group({
      slider_image:['',[Validators.required]],
      title:['',[Validators.required]]
     })
  }

  onSubmit(data:sliderData){
    console.log(this.slderForm.value,33);
    this._sliderService.sliderData(data).subscribe((res)=>{
      if(res.status == 1){
        this._tostr.success(res.message);
        console.log(res,55);
        
      }
    })
  }
}
