import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class ValidationErrorsService {

    constructor(private toastrService: ToastrService, 
        private router: Router,
        private translate: TranslateService) {}

    handleFormError(returnUrl: string[]) : void { 
        this.toastrService.error(
            this.translate.instant("VALIDATION.SUBMIT_ERROR")
        )

        this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=> this.router.navigate(returnUrl));
    }
}