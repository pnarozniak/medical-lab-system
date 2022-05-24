import { map, Observable } from "rxjs";
import { ApiService } from "../core/api.service"
import { Injectable } from "@angular/core";
import { Employee, EmployeeAdapter, IEmployee } from "./employee.model";

@Injectable({
    providedIn: "root"
})
export class EmployeeService {

    constructor(
        private apiService: ApiService,
        private employeeAdapter: EmployeeAdapter,
    ){}

    list() : Observable<Employee[]> {
        return this.apiService.get<IEmployee[]>('/employees').pipe(
            map((employees:IEmployee[]) => employees.map((e: IEmployee) => this.employeeAdapter.adapt(e))))
    }

    details(idEmployee: number) : Observable<Employee> {
        return this.apiService.get<IEmployee>(`/employees/${idEmployee}`).pipe(
            map((e: IEmployee) => {
                const employee = this.employeeAdapter.adapt(e)
                return employee
            }))
    }

    create(newEmployee: Employee) : Observable<IEmployee> {
        return this.apiService.post<Employee, IEmployee>('/employees', newEmployee)
    }

    edit(employeeId: number, modifiedEmployee: Employee) : Observable<any> {
        return this.apiService.put<Employee, any>(`/employees/${employeeId}`, modifiedEmployee)
    }

    delete(employeeId: number) : Observable<any> {
        return this.apiService.delete<any>(`/employees/${employeeId}`)
    }
}