import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class EmployeeResolverService implements Resolve<Employee> {

  constructor(
    private employeeService: EmployeeService,
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

        return this.employeeService.details(parseInt(id as string))
            .pipe(catchError(_ => {
                return this.handleError()
            }))
    }

    private handleError() : Promise<boolean> {
        this.toastrService.error(
            this.translate.instant("ALERTS.ERROR.EMPLOYEE_NOT_FOUND")
        )
        return this.router.navigate(['/employees'])
    }
}
