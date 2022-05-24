import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient, PatientAdapter } from 'src/app/patient/patient.model';
import { Examination, ExaminationAdapter } from '../../examination.model';
import { Test, TestAdapter } from 'src/app/test/test.model';
import { PatientService } from 'src/app/patient/patient.service';
import { TestService } from 'src/app/test/test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ValidationErrorsService } from 'src/app/core/validation-errors.service';

@Component({
  selector: 'examination-form',
  templateUrl: './examination-form.component.html',
  styleUrls: ['./examination-form.component.scss']
})
export class ExaminationFormComponent implements OnInit, AfterViewInit {
  @Input() examination: Examination | undefined;
  @Input() submitText: string = ''
  @Input() onValidSubmit!: (newExamination: Examination) => Observable<HttpErrorResponse>;
  @Input() disabled: boolean = false
  @Input() returnUrl: string[] = ['/']
  
  fg!: FormGroup;
  optionsPatients: Patient[] = []
  optionsTests: Test[] = []

  constructor(private patientService: PatientService, 
    private testService: TestService,
    private examinationAdapter: ExaminationAdapter,
    private testAdapter: TestAdapter,
    private patientAdapter: PatientAdapter,
    private validationErrorsService: ValidationErrorsService) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    const splittedTime : string[] | undefined = this.examination?.arrangedAt?.toTimeString().split(':')
    let timeInitialValue = splittedTime && `${splittedTime[0]}:${splittedTime[1]}`

    this.fg = new FormGroup({
      arrangedAtDate: new FormControl(this.examination?.arrangedAt,[
        Validators.required
      ]),
      arrangedAtTime: new FormControl(timeInitialValue,[
        Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
      ]),
      result: new FormControl(this.examination?.result === null ? -1 : this.examination?.result, [
        Validators.required
      ]),
      referal: new FormControl(this.examination?.referal,[
        Validators.required
      ]),
      patientId: new FormControl(this.examination?.patient?.id, [
        Validators.required
      ]), 
      testId: new FormControl(this.examination?.test?.id, [
        Validators.required
      ])
    })

    if (this.disabled) {return this.fg.disable()}

    this.loadOptions()
  }

  private loadOptions = () : void => {
    this.patientService.list()
      .subscribe((patients: Patient[]) => this.optionsPatients = patients)

    this.testService.list()
      .subscribe((tests: Test[]) => this.optionsTests = tests)
  }

  get arrangedAtDate() {return this.fg.get('arrangedAtDate')}
  get arrangedAtTime() {return this.fg.get('arrangedAtTime')}
  get result() {return this.fg.get('result')}
  get referal() {return this.fg.get('referal')}
  get patientId() {return this.fg.get('patientId')}
  get testId() {return this.fg.get('testId')}

  handleSubmit() : void {
    if (this.fg.invalid || !this.onValidSubmit) return

    const arrangedAt = new Date(this.arrangedAtDate!.value)
    arrangedAt.setHours(this.arrangedAtTime!.value.split(':')[0])
    arrangedAt.setMinutes(this.arrangedAtTime!.value.split(':')[1])

    const values = {
      ...this.fg.value,
      arrangedAt: arrangedAt,
      result: this.result!.value == -1 ? null : this.result!.value
    }

    const newExamination : Examination = this.examinationAdapter.adapt(values)
    newExamination.test = this.testAdapter.adapt({id: this.testId!.value})
    newExamination.patient = this.patientAdapter.adapt({id: this.patientId!.value})

    this.onValidSubmit(newExamination)
      .subscribe((err: HttpErrorResponse) => {
        this.validationErrorsService.handleFormError(this.returnUrl)
      })
  }
}
