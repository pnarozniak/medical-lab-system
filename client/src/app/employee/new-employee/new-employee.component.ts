import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Employee, IEmployee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }

  createEmployee = (newEmployee: Employee): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.employeeService.create(newEmployee)
      .subscribe({
        next: (createdEmployee: IEmployee) => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.EMPLOYEE_CREATED"))
          this.router.navigate(['/employees', createdEmployee.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
