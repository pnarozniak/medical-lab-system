import { Adapter } from '../core/adapter'
import { Injectable } from '@angular/core'

export interface ILoggedUser {
    id: number,
    email: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
}

export class LoggedUser implements ILoggedUser {
    constructor(public id: number, public email: string, public accessToken: string, public refreshToken: string, public roles: string[]){}

    hasRole(roles: string[]) : boolean {
        return this.roles.some(r => roles.includes(r))
    }
}

@Injectable({
    providedIn: "root",
  })
export class LoggedUserAdapter implements Adapter<LoggedUser> {
    adapt(item: ILoggedUser): LoggedUser {
        return new LoggedUser(item.id, item.email, item.accessToken, item.refreshToken, item.roles);
    }
}