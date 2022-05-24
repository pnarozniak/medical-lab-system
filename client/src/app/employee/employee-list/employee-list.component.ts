import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = []

  constructor(private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private authService: AuthService) 
  {}

ngOnInit(): void {
  this.fetchEmployees()
}

private fetchEmployees(): void {
  this.employeeService.list().subscribe(employees => {
    this.employees = employees.filter(e => e.id !== this.authService.loggedUser?.id)
  })
}

tryDelete = (deletedEmployee: Employee) : void => {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '300px',
    data: {
      title: this.translate.instant('EMPLOYEES.TRY_DELETE_TITLE'), 
      details: `${deletedEmployee.firstName} ${deletedEmployee.lastName} (${deletedEmployee.email})`},
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return

    this.delete(deletedEmployee.id)
  });
}

private delete = (deletedEmployeeId: number) : void => {
  this.employeeService.delete(deletedEmployeeId)
  .subscribe({
    next: _ => {
      this.toastrService.success(this.translate.instant('ALERTS.SUCCESS.EMPLOYEE_DELETED'))
    },
    error: _ => {
      this.toastrService.error(this.translate.instant('ALERTS.ERROR.EMPLOYEE_NOT_DELETED'))
    },
    complete: () => {
      this.fetchEmployees()
    }
  })
}

}
