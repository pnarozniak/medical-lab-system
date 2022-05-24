import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidationErrorsService } from 'src/app/core/validation-errors.service';
import { Test } from 'src/app/test/test.model';
import { TestService } from 'src/app/test/test.service';
import { DeliveryContent, DeliveryContentAdapter } from '../delivery-content.model';
import { Delivery, DeliveryAdapter } from '../delivery.model';
import { Supplier } from '../supplier/supplier.model';
import { SupplierService } from '../supplier/supplier.service';

@Component({
  selector: 'delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {
  @Input() deliveryContent: any[] = [];
  @Input() delivery: Delivery | undefined;
  @Input() submitText: string = ''
  @Input() onValidSubmit!: (newDelivery: Delivery, newDeliveryContent: any[]) => Observable<HttpErrorResponse> 
  @Input() disabled: boolean = false
  @Input() returnUrl: string[] = ['/']

  fg !: FormGroup
  optionsSuppliers: Supplier[] = []
  optionsTests: Test[] = []

  expanded: boolean = false

  constructor(private deliveryAdapter: DeliveryAdapter,
    private validationErrorsService: ValidationErrorsService,
    private deliveryContentAdapter: DeliveryContentAdapter,
    private testsService: TestService,
    private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      supplierId: new FormControl(
        this.delivery?.supplier?.id, 
        [Validators.required]),
      plannedAt: new FormControl(
        this.delivery?.plannedAt, 
        [Validators.required]),
      deliveredAt: new FormControl(
        this.delivery?.deliveredAt),
      comments: new FormControl(
          this.delivery?.comments, 
        [Validators.maxLength(500)]),
      testId: new FormControl(
        null, [Validators.required]),
      expiresAt: new FormControl(
        null, [Validators.required]),
      amount: new FormControl(
        null, [Validators.required, Validators.pattern("^[0-9]+$")]
      )
    })

    if (this.disabled) return this.fg.disable()

    this.loadOptions()
  }

  private loadOptions = () : void => {
    this.supplierService.list()
      .subscribe((suppliers: Supplier[]) => this.optionsSuppliers = suppliers)
    
    this.testsService.list()
      .subscribe((tests: Test[]) => this.optionsTests = tests)
  }

  get supplierId() {return this.fg.get('supplierId')}
  get comments() { return this.fg.get('comments') }
  get plannedAt() { return this.fg.get('plannedAt') }
  get deliveredAt() { return this.fg.get('deliveredAt') }
  get testId() {return this.fg.get('testId')}
  get expiresAt() { return this.fg.get('expiresAt') }
  get amount() {return this.fg.get('amount')}
  
  handleAddItem(): void {
    this.testId?.markAsTouched()
    this.testId?.updateValueAndValidity()
    this.expiresAt?.markAsTouched()
    this.expiresAt?.updateValueAndValidity()
    this.amount?.markAsTouched()
    this.amount?.updateValueAndValidity()

    if (this.testId?.invalid || this.expiresAt?.invalid || this.amount?.invalid) return

    const newItem = {
      amount: this.amount!.value,
      expiresAt: this.expiresAt!.value,
      testId: this.testId!.value,
      testName: this.optionsTests.find(t => t.id == this.testId!.value)!.name,
      timestamp: Date.now()
    }
    
    this.deliveryContent.push(newItem)
    this.resetAddItem()
  }

  handleRemoveItem(item: any): void {
    this.deliveryContent = this.deliveryContent.filter(dc => {
      if (!dc.id) return dc.timestamp != item.timestamp
      
      return dc.id != item.id
    })
  }

  private resetAddItem(): void {
    this.testId?.reset()
    this.testId?.setErrors(null)
    this.expiresAt?.reset()
    this.expiresAt?.setErrors(null)
    this.amount?.reset()
    this.amount?.setErrors(null)
    this.expanded = false
  }

  handleSubmit(): void {
    this.resetAddItem()

    if (this.fg.invalid || !this.onValidSubmit) return

    const newDelivery = this.deliveryAdapter.adapt(this.fg.value)
    newDelivery.supplier = new Supplier(this.supplierId!.value, '', '')

    this.onValidSubmit(newDelivery, this.deliveryContent)
      .subscribe((err: HttpErrorResponse) => {
        if (err) {
          this.validationErrorsService.handleFormError(this.returnUrl)
        }
    })
  }
}
