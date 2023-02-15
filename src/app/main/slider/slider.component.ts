import { HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { SliderService } from "./slider.service";
import Swal from 'sweetalert2';
 



@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
  encapsulation: ViewEncapsulation.None

})
export class SliderComponent implements OnInit {
  slderForm!: FormGroup;
  public ColumnMode = ColumnMode;
  rows: any;
  count: any;
  showModal = false;
  ErrorMessage:boolean
  isFormValid : boolean = false;
  isLoading: boolean = false;

  currentSlider: any;

  
  
  /**
   * 
   * @param _sliderService 
   * @param fb 
   * @param _tostr 
   * @param ModalService 
   */

  constructor(
    private _sliderService: SliderService,
    private fb: FormBuilder,
    private _tostr: ToastrService,
  ) {}

  /**
   * formbuilder form
   */

  ngOnInit(): void {
    this.slderForm = this.fb.group({
      slider_image: ["", [Validators.required]],
      title: ["", [Validators.required]],
      status:['1']
    });

    let params = new HttpParams()
    this.getimagedata(params)
    
  }

  /**
   * Get image data
   * @param params 
   */

  getimagedata(params){
    this._sliderService.getAllSlider(params).subscribe((res)=>{

      // console.log(res.data[0]._id,55);
      if(res.status == 1){
        // this._tostr.success(res.message);
        console.log(res.data,44);
       this.rows = res.data;
       this.count = this.rows.length;
       console.log(this.count,88);
       this.setstatus(this.rows)
      }
     })
  }


 
    // for set user role
    setstatus(rows) {
      rows.forEach(row => {
        if (row.status == 1) {
          row.status = 'Active'
        }
        else if (row.status == 2) {
          row.status = 'Inactive'
        }
        else {
          row.status = ''
        }
      });
    }

    /**
     * form control
     */

    get f() {
      return this.slderForm.controls
    }

  onSubmit() {
    
    this.isFormValid = true;
    if (this.slderForm.valid) {
      if (!this.ErrorMessage) {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('title',  this.slderForm.value['title']);

          formData.append('slider_image',  this.slderForm.value['slider_image']);
          formData.append('status', this.slderForm.value['status']);
    
        if (this.currentSlider) {
          
          // If there is a current slider, update the slider data
          // formData.append('id', this.currentSlider._id);
          this._sliderService.editSlider(this.currentSlider._id,formData).subscribe((res) => {
            if (res.status == 1) {
              this.showModal = false;
              this._tostr.success(res.message);
              this.currentSlider = null;
              this.getimagedata(HttpParams)

               this.slderForm.reset();

            } else {
              this._tostr.warning(res.message)
            }
          });
        } else {
          // If there is no current slider, add new slider data
          this._sliderService.sliderData(formData).subscribe((res) => {
            if (res.status == 1) {
              this.showModal = false;
              this._tostr.success(res.message);
              this.slderForm.reset();
            } else {
              this._tostr.warning(res.message)
            }
          });
        }
      } else {
        alert("Invalid Format of image")
      }
    }
 
  }

  setstatusvalue(event) {
    if (event.target.checked) {
      this.slderForm.value["status"] = 1;
    } else {
      this.slderForm.value["status"] = 2;
    }
  }

  /**
   * 
   * @param event 
   */

  handleFileInput(event) {
    // this.image = event.target.files[0];
    // console.log(this.image);

    const file = event.target.files[0];
    // console.log(file,90);
    if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg')
    {
      this.ErrorMessage = false;
    }
    else{
       this.ErrorMessage = true;
    }
    
    const fileReader = new FileReader();
    console.log(fileReader,100);
    
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = ((_e:any)=>{
      this.slderForm.patchValue({
        slider_image: file
      })
    })
}

/**
 * deleting slider data
 * @param id 
 */

deleteData(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      
  console.log(id,99);
  
      
      this._sliderService.deleteData(id).subscribe(
        data => {
          console.log(data,100);
          this.getimagedata(HttpParams)
          
          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          );
        },
        error => {
          Swal.fire(
            'Error!',
            'There was an error deleting the data.',
            'error'
          );
        }
      );
    }
  });
}






/**
 * toggle form /slider
 */

AddNewSlider(){
  if (!this.isLoading || this.currentSlider == null) { // allow to toggle only if isLoading is false
    this.showModal = !this.showModal;
    this.slderForm.reset()
  }
  
}

/**
 * edit slider data
 */


editData(id: string) {
  this._sliderService.getSlider(id).subscribe((res) => {
    if (res.status == 1) {
      console.log(res.data,22);
      this.currentSlider = res.data;      
      this.slderForm.patchValue({
        title: this.currentSlider.title,
        status: this.currentSlider.status,
        slider_image:this.currentSlider.slider_image
      });
      this.showModal = true;
    } else {
      this._tostr.warning(res.message);
    }
  });
}


}
