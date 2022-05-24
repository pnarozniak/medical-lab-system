import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationErrorsService } from 'src/app/core/validation-errors.service';
import { Patient, PatientAdapter } from '../../patient.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { emailValidator } from 'src/app/core/email-validator.directive';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  @Input() patient: Patient | undefined;
  @Input() submitText: string = ''
  @Input() onValidSubmit!: (newPatient: Patient) => Observable<HttpErrorResponse> 
  @Input() disabled: boolean = false
  @Input() returnUrl: string[] = ['/']

  fg !: FormGroup

  constructor(private patientAdapter: PatientAdapter,
    private validationErrorsService: ValidationErrorsService) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      firstName: new FormControl(
        this.patient?.firstName, 
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      lastName: new FormControl(
        this.patient?.lastName, 
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      gender: new FormControl(
        this.patient?.gender.toString(), 
        [Validators.required]),
      email: new FormControl(
        this.patient?.email, 
        [Validators.required, Validators.minLength(3), Validators.maxLength(60), emailValidator()]),
      birthdate: new FormControl(
        this.patient?.birthdate, 
        [Validators.required]),
      phoneNumber: new FormControl(
        this.patient?.phoneNumber, 
        [Validators.pattern('^[0-9]{9}$')])
    })

    if (this.disabled)
      this.fg.disable()
  }

  get firstName() {return this.fg.get('firstName')}
  get lastName() {return this.fg.get('lastName')}
  get gender() {return this.fg.get('gender')}
  get birthdate() {return this.fg.get('birthdate')}
  get email() {return this.fg.get('email')}
  get phoneNumber() {return this.fg.get('phoneNumber')}

  handleSubmit() : void {
    if (this.fg.invalid || !this.onValidSubmit) return

    const newPatient = this.patientAdapter.adapt(this.fg.value)

    this.onValidSubmit(newPatient)
      .subscribe((err: HttpErrorResponse) => {
        if (err) {
          this.validationErrorsService.handleFormError(this.returnUrl)
        }
      })
  }
}
