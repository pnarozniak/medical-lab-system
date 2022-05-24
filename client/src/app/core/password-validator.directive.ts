import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value)
            return null;
            

        const isValid = control.value.match(".*[0-9].*") && control.value.match(".*[A-Z].*")
        
        return !isValid ? {forbiddenPassword: {value: control.value}} : null;
    };
}