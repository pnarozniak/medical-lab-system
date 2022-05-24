import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from 'rxjs';
import { Patient } from "./patient.model";
import { PatientService } from "./patient.service";
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class PatientResolverService implements Resolve<Patient>{

    constructor(
        private patientService: PatientService,
        private router: Router,
        private toastrService: ToastrService,
        private translate: TranslateService){}

        resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            const id = route.paramMap.get('id');
            const isNotInt = !id || isNaN(Number(id)) || id.includes('.')

            if (isNotInt) {
                return this.handleError()
            }

            return this.patientService.details(parseInt(id as string))
                .pipe(catchError(_ => {
                    return this.handleError()
                }))
        }

        private handleError() : Promise<boolean> {
            this.toastrService.error(
                this.translate.instant("ALERTS.ERROR.PATIENT_NOT_FOUND")
            )
            return this.router.navigate(['/patients'])
        }
}