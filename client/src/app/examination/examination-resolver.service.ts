import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Examination } from './examination.model';
import { ExaminationService } from './examination.service';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ExaminationResolverService implements Resolve<Examination> {

  constructor(
    private examinationService: ExaminationService,
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

        return this.examinationService.details(parseInt(id as string))
            .pipe(catchError(_ => {
                return this.handleError()
            }))
    }

    private handleError() : Promise<boolean> {
        this.toastrService.error(
            this.translate.instant("ALERTS.ERROR.EXAMINATION_NOT_FOUND")
        )
        return this.router.navigate(['/examinations'])
    }
}
