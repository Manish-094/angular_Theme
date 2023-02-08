import { AbstractControl,ValidationErrors,ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";


    export function createPasswordStrengthValidator(control: AbstractControl):Promise<ValidationErrors | null> |Observable<ValidationErrors> | null {
        const value = control.value;

        if(!value){
            return of();
        }
        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? of({passwordStrength:true}): of();
  
    }
      



