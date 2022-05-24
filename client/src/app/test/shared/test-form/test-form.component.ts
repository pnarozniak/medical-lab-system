import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Test, TestAdapter } from '../../test.model';
import { Observable } from 'rxjs';
import { ValidationErrorsService } from 'src/app/core/validation-errors.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {
  @Input() test: Test | undefined;
  @Input() submitText: string = ''
  @Input() onValidSubmit!: (newTest: Test) => Observable<HttpErrorResponse>
  @Input() disabled: boolean = false
  @Input() returnUrl: string[] = ['/']

  fg !: FormGroup

  constructor(private testAdapter: TestAdapter,
    private validationErrorsService: ValidationErrorsService) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      name: new FormControl(
        this.test?.name, 
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      contraindications: new FormControl(
        this.test?.contraindications, 
        [Validators.maxLength(500)]),
      effectiveness: new FormControl(
        this.test?.effectiveness,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]{1,2}.?[0-9]{0,2}$')]),
      hours: new FormControl(
        this.test?.parsedEstimatedDuration?.hours, 
        [Validators.required, Validators.min(0), Validators.max(23)]),
      minutes: new FormControl(
        this.test?.parsedEstimatedDuration?.minutes,
        [Validators.required, Validators.min(0), Validators.max(59)]
      ),
      seconds: new FormControl(
        this.test?.parsedEstimatedDuration?.seconds,
        [Validators.required, Validators.min(0), Validators.max(59)]
      ),
    })

    if (this.disabled)
      this.fg.disable()
  }

  get name() {return this.fg.get('name')}
  get contraindications() {return this.fg.get('contraindications')}
  get effectiveness() {return this.fg.get('effectiveness')}
  get hours() {return this.fg.get('hours')}
  get minutes() {return this.fg.get('minutes')}
  get seconds() {return this.fg.get('seconds')}


  handleSubmit() : void {
    if (this.fg.invalid || !this.onValidSubmit) return

    const values = {
      ...this.fg.value,
      estimatedDuration: `${this.hours?.value}:${this.minutes?.value}:${this.seconds?.value}`
    }

    this.onValidSubmit(this.testAdapter.adapt(values))
      .subscribe((err: HttpErrorResponse) => {
          this.validationErrorsService.handleFormError(this.returnUrl)
      })
  }
}
