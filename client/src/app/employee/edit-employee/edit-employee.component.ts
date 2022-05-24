import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  employee!: Employee;

  constructor(private employeeService: EmployeeService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private toastrService: ToastrService,
      private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.employee = data.employee;
    })
  }

  editEmployee = (modifiedEmployee: Employee): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.employeeService.edit(this.employee.id, modifiedEmployee)
      .subscribe({
        next: _ => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.EMPLOYEE_EDITED"))
          this.router.navigate(['/employees', this.employee.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }

}
