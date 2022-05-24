import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationErrorsService } from 'src/app/core/validation-errors.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { emailValidator } from 'src/app/core/email-validator.directive';
import { Employee, EmployeeAdapter } from '../../employee.model';
import { passwordValidator } from '../../../core/password-validator.directive'

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | undefined;
  @Input() submitText: string = ''
  @Input() onValidSubmit!: (newEmployee: Employee) => Observable<HttpErrorResponse> 
  @Input() disabled: boolean = false
  @Input() returnUrl: string[] = ['/']

  fg !: FormGroup

  constructor(private employeeAdapter: EmployeeAdapter,
    private validationErrorsService: ValidationErrorsService) { }

  ngOnInit(): void {
    console.log(this.employee?.roles)
    this.fg = new FormGroup({
      firstName: new FormControl(
        this.employee?.firstName, 
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      lastName: new FormControl(
        this.employee?.lastName, 
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl(
        this.employee?.email, 
        [Validators.required, Validators.minLength(3), Validators.maxLength(60), emailValidator()]),
      password: new FormControl(this.disabled ? '********' : null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(32), passwordValidator()
      ]),  
      roles: new FormControl(
        this.employee?.roles, [
        Validators.required
      ])
    })

    if (this.disabled)
      this.fg.disable()
  }

  get firstName() {return this.fg.get('firstName')}
  get lastName() {return this.fg.get('lastName')}
  get email() {return this.fg.get('email')}
  get password() {return this.fg.get('password')}
  get roles() {return this.fg.get('roles')}

  get showEmailAlreadyTaken() {
    return this.email && this.email.errors && Object.keys(this.email.errors).length === 1 && this.email.hasError('emailAlreadyTaken')
  }

  handleSubmit() : void {
    if (this.fg.invalid || !this.onValidSubmit) return

    const newEmployee = this.employeeAdapter.adapt(this.fg.value)
    
    this.onValidSubmit(newEmployee)
      .subscribe((err: HttpErrorResponse) => {
        if (err) {
          if (err.status === 400)
            this.email?.setErrors({emailAlreadyTaken: true})
          else
            this.validationErrorsService.handleFormError(this.returnUrl)
        }
      })
  }
}
