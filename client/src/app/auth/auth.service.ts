import { Injectable } from '@angular/core'
import { ApiService } from '../core/api.service';
import { ILoggedUser, LoggedUser, LoggedUserAdapter } from './logged-user.model';
import { map, Observable, throwError } from 'rxjs'
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggedUser?: LoggedUser

    constructor(private apiService: ApiService, 
        private loggedUserAdapter: LoggedUserAdapter, 
        private tokenService: TokenService,
        private router: Router) {}

    login(email: string, password: string) : Observable<ILoggedUser> {
        return this.apiService.post<any, ILoggedUser>('/auth/login', {email: email, plainPassword: password})
            .pipe(map((res: ILoggedUser) => {
                const claims = this.tokenService.parseClaimsFromJwt(res.accessToken)
                this.loggedUser = this.loggedUserAdapter.adapt({
                    ...res,
                    ...claims
                })                

                this.tokenService.saveTokens(this.loggedUser.accessToken, this.loggedUser.refreshToken)
                return res
            }))
    }
    
    refresh() : Observable<ILoggedUser> {
        if (!this.loggedUser) return throwError(()=>new Error())

        return this.apiService.post<any, ILoggedUser>('/auth/refresh', {refreshToken: this.loggedUser.refreshToken})
        .pipe(map((res: ILoggedUser) => {
            const claims = this.tokenService.parseClaimsFromJwt(res.accessToken)
            this.loggedUser = this.loggedUserAdapter.adapt({
                ...res,
                ...claims
            })
            
            this.tokenService.saveTokens(this.loggedUser.accessToken, this.loggedUser.refreshToken)
            return res
        }))
    }

    validateAuthState() : void {
        const tokens = this.tokenService.getTokens();
        if (!tokens || !tokens.access || !tokens.refresh) return this.tokenService.deleteTokens()

        const claims : ILoggedUser | null = this.tokenService.parseClaimsFromJwt(tokens.access as string)
        if (!claims) return;

        claims.refreshToken = tokens.refresh
        claims.accessToken = tokens.access

        this.loggedUser = this.loggedUserAdapter.adapt(claims)
        
        this.refresh().subscribe({
            error: _ => {
                this.logout()
                this.router.navigate(['/auth/login', {sessionExpired: true}])
            }
        })
    } 

    logout(silent: boolean = false) : void {
        if (silent) {
            this.loggedUser = undefined
            this.tokenService.deleteTokens()
            return
        }

        this.apiService.post<any, any>('/auth/logout', {})
        .subscribe({
            next: _ => {
                this.loggedUser = undefined
                this.tokenService.deleteTokens()
            },
            error: _ => {
                this.loggedUser = undefined
                this.tokenService.deleteTokens() 
            }
        })
    }
}
