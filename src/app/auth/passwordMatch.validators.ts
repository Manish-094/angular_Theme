import { AbstractControl,ValidationErrors,FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";

export function MustMatch(password: string, cnfpassword: string) {
    
    return (formGroup: FormGroup) => {
        let pass = formGroup.controls[password];
        let cnfpass = formGroup.controls[cnfpassword]
        
        if (pass.value !== cnfpass.value) {
          cnfpass.setErrors({ confirmPasswordValidator: true });
        } else {
          cnfpass.setErrors(null);
        }
      };
    // const pass = controlOne.value;
    // const cnfpassword = controlTwo.value;
    // if(!pass){
    //     return of();
    // }
    // if(!cnfpassword){
    //     return of();
    // }
    // return (pass !== cnfpassword) ? of({mustmatch:true}) : of();
}