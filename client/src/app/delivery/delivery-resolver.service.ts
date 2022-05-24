import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from "@ngx-translate/core";
import { DeliveryService } from "./delivery.service";
import { Delivery } from "./delivery.model";


@Injectable()
export class DeliveryResolverService implements Resolve<Delivery>{

    constructor(
        private router: Router,
        private toastrService: ToastrService,
        private translate: TranslateService,
        private deliveryService: DeliveryService) { }

        resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<any> | Promise<any> | any {
            const id = route.paramMap.get('id');
            const isNotInt = !id || isNaN(Number(id)) || id.includes('.')

            if (isNotInt) {
                return this.handleError()
            }

            return this.deliveryService.details(parseInt(id as string))
                .pipe(catchError(_ => {
                    return this.handleError()
                }))
        }

        private handleError() : Promise<boolean> {
            this.toastrService.error(
                this.translate.instant("ALERTS.ERROR.DELIVERY_NOT_FOUND")
            )
            return this.router.navigate(['/delivery'])
        }
}