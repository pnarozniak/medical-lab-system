import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from "@ngx-translate/core";
import { Supplier } from "./supplier.model";
import { SupplierService } from "./supplier.service";


@Injectable()
export class SupplierResolverService implements Resolve<Supplier>{

    constructor(
        private router: Router,
        private toastrService: ToastrService,
        private translate: TranslateService,
        private supplierService: SupplierService) { }

        resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<any> | Promise<any> | any {
            const id = route.paramMap.get('id');
            const isNotInt = !id || isNaN(Number(id)) || id.includes('.')

            if (isNotInt) {
                return this.handleError()
            }

            return this.supplierService.details(parseInt(id as string))
                .pipe(catchError(_ => {
                    return this.handleError()
                }))
        }

        private handleError() : Promise<boolean> {
            this.toastrService.error(
                this.translate.instant("ALERTS.ERROR.SUPPLIER_NOT_FOUND")
            )
            return this.router.navigate(['/delivery'])
        }
}