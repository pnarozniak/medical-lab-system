import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value)
            return null;
            
        const isValid = control.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
        
        return !isValid ? {forbiddenEmail: {value: control.value}} : null;
    };
}