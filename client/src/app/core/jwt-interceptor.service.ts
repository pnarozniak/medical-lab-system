import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loggedUser = this.authService.loggedUser

        if (!this.authService.loggedUser) {
            return next.handle(req)
        }
        
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${loggedUser!.accessToken}` }
        });

        return next.handle(req);
    }
}