import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, 
        private router: Router, 
        private toastrService: ToastrService,
        private translate: TranslateService){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if (!this.authService.loggedUser) {
            this.router.navigate(['/auth/login', {loginRequired: true}])
            return false
        }

        const requiredRoles = route.data['requiredRoles'] as Array<string> | undefined;

        if (!requiredRoles)
            return true

        const hasRequiredRoles = requiredRoles
            .some(requiredRole => this.authService.loggedUser!.roles.includes(requiredRole))
       
        if (hasRequiredRoles)
            return true
        
        this.toastrService.error(
            this.translate.instant("ALERTS.ERROR.NO_ACCESS")
        )
        return false
    } 
}