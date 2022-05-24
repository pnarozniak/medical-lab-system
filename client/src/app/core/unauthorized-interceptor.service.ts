import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ILoggedUser } from '../auth/logged-user.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class UnauthorizedInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    refreshingUserSubject: BehaviorSubject<ILoggedUser | null> = new BehaviorSubject<ILoggedUser | null>(null);

    constructor(private authService: AuthService,
        private toastrService: ToastrService,
        private router: Router,
        private translate: TranslateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 401 && !req.url.includes('/api/auth/refresh')) {
                if (this.authService.loggedUser)
                    return this.handle401Error(req, next)
                
                this.router.navigate(['/auth/login', {loginRequired: true}])
            }
            else if (err.status === 403) {
                this.toastrService.error(
                    this.translate.instant("ALERTS.ERROR.NO_ACCESS")
                )
            }

            return throwError(()=>(err));
        }))
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true
            this.refreshingUserSubject.next(null)

            return this.authService.refresh().pipe(
                switchMap((user: ILoggedUser) => {
                    this.isRefreshingToken = false
                    this.refreshingUserSubject.next(user)

                    return next.handle(this.addJwtToReq(req, user.accessToken))
                }),
                catchError((err) => {
                    this.isRefreshingToken = false 

                    this.authService.logout(true)
                    this.router.navigate(['/auth/login', {sessionExpired: true}])

                    return throwError(()=>(err))
                })
            )
        }

        return this.refreshingUserSubject.pipe(
            filter(user => user !== null),
            take(1),
            switchMap((user) => next.handle(this.addJwtToReq(req, user!.accessToken)))
          );
    }

    private addJwtToReq(req: HttpRequest<any>, jwt: string) : HttpRequest<any>{
        return req.clone({
            setHeaders: { Authorization: `Bearer ${jwt}` }
        });
    }
}