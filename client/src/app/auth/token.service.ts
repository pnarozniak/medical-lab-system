import { Injectable } from '@angular/core'
import { ILoggedUser } from './logged-user.model'

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private accessTokenName: string = 'access_token'
    private refreshTokenName: string = 'refresh_token'

    saveTokens(accessToken: string, refreshToken: string) : void{
        localStorage.setItem(this.accessTokenName, accessToken)
        localStorage.setItem(this.refreshTokenName, refreshToken)
    }

    deleteTokens() : void {
        localStorage.removeItem(this.accessTokenName)
        localStorage.removeItem(this.refreshTokenName)
    }

    getTokens() : {access: string | null, refresh: string | null} {
        return {
            access: localStorage.getItem(this.accessTokenName),
            refresh: localStorage.getItem(this.refreshTokenName)
        }
    }

    parseClaimsFromJwt(jwt: string) : ILoggedUser | null {
        if (!jwt) return null

        const data = JSON.parse(atob(jwt.split('.')[1]))
        
        if (data.id && data.email && data.roles)
            return data as ILoggedUser

        return null
    }
}
