import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { emailValidator } from 'src/app/core/email-validator.directive';
import { ValidationErrorsService } from 'src/app/core/validation-errors.service';
import { Supplier, SupplierAdapter } from '../supplier.model';

@Component({
  selector: 'supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  @Input() supplier: Supplier | undefined;
  @Input() submitText: string = ''
  @Input() onValidSubmit!: (newSupplier: Supplier) => Observable<HttpErrorResponse> 
  @Input() disabled: boolean = false
  @Input() returnUrl: string[] = ['/']

  fg !: FormGroup

  constructor(private supplierAdapter: SupplierAdapter,
    private validationErrorsService: ValidationErrorsService) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      name: new FormControl(
        this.supplier?.name, 
        [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      contactEmail: new FormControl(
        this.supplier?.contactEmail, 
        [Validators.required, Validators.minLength(3), Validators.maxLength(60), emailValidator()]),
    })

    if (this.disabled)
      this.fg.disable()
  }

  get name() {return this.fg.get('name')}
  get contactEmail() {return this.fg.get('contactEmail')}

  handleSubmit() : void {
    if (this.fg.invalid || !this.onValidSubmit) return

    const newSupplier = this.supplierAdapter.adapt(this.fg.value)

    this.onValidSubmit(newSupplier)
      .subscribe((err: HttpErrorResponse) => {
        if (err) {
          this.validationErrorsService.handleFormError(this.returnUrl)
        }
      })
  }
}
