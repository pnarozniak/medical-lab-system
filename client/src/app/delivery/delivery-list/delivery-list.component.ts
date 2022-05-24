import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Delivery } from '../delivery.model';
import { DeliveryService } from '../delivery.service';
import { Supplier } from '../supplier/supplier.model';
import { SupplierService } from '../supplier/supplier.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  suppliers: Supplier[] = []
  delivery: Delivery[] = []

  constructor(private supplierService: SupplierService,
      private deliveryService: DeliveryService,
      private dialog: MatDialog,
      private toastrService: ToastrService,
      private translate: TranslateService,
      private authService: AuthService) 
  {}

  ngOnInit(): void {
    this.fetchSuppliers()
    this.fetchDelivery()
  }

  private fetchSuppliers(): void {
    this.supplierService.list().subscribe(suppliers => {
      this.suppliers = suppliers
    })
  }

  private fetchDelivery(): void {
    this.deliveryService.list().subscribe(delivery => {
      this.delivery = delivery
    })
  }

  tryDelete = (obj: Delivery | Supplier) : void => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: this.translate.instant(obj instanceof Delivery ? 'DELIVERY.TRY_DELETE_TITLE' : 'SUPPLIERS.TRY_DELETE_TITLE'), 
        details: obj instanceof Delivery ? `${this.translate.instant('DELIVERY.ID')}: ${obj.id}` : `${obj.name}`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.delete(obj)
    });
  }

  private delete = (obj: Delivery | Supplier): void => {
    const response = {
      next: (_: any) => {
        this.toastrService.success(this.translate.instant(`ALERTS.SUCCESS.${obj instanceof Delivery ? 'DELIVERY_DELETED' : 'SUPPLIER_DELETED'}`))
      },
      error: (_: any) => {
        this.toastrService.error(this.translate.instant(`ALERTS.ERROR.${obj instanceof Delivery ? 'DELIVERY_NOT_DELETED' : 'SUPPLIER_NOT_DELETED'}`))
      },
      complete: () => {
        this.fetchSuppliers()
        this.fetchDelivery()
      }
    }

    if (obj instanceof Delivery)
      this.deliveryService.delete(obj.id).subscribe(response)
    else
      this.supplierService.delete(obj.id).subscribe(response)
  }
}
