import { Injectable } from '@angular/core'
import { Adapter } from '../core/adapter'

export interface IEmployee {
    id: number
    email: string
    firstName: string,
    lastName: string,
    password: string | null,
    roles: string[]
}

export class Employee implements IEmployee {
    constructor(
        public id: number, public email: string, public firstName: string, public lastName: string, public password: string | null
    ,public roles: string[]){}
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeAdapter implements Adapter<Employee> {
    adapt(data: IEmployee | any): Employee {
        const employee = new Employee(
            data.id, data.email, data.firstName, data.lastName, data.password, data.roles)
    
        return employee
    }
}