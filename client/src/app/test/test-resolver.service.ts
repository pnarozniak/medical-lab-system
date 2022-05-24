import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Test } from './test.model';
import { Observable } from 'rxjs';
import { TestService } from './test.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TestResolverService implements Resolve<Test>{

    constructor(private testService: TestService,
        private toastrService: ToastrService,
        private router: Router,
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

        return this.testService.details(parseInt(id as string))
            .pipe(catchError(_ => {
                return this.handleError()
            }))
    }

    private handleError() : Promise<boolean> {
        this.toastrService.error(
            this.translate.instant("ALERTS.ERROR.TEST_NOT_FOUND")
        )
        return this.router.navigate(['/tests'])
    }
}