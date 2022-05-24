import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { ISupplier, Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';


@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss']
})
export class NewSupplierComponent implements OnInit {

  constructor(private supplierService: SupplierService,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }

  createSupplier = (newSupplier: Supplier): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.supplierService.create(newSupplier)
      .subscribe({
        next: (createdSupplier: ISupplier) => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.SUPPLIER_CREATED"))
          this.router.navigate(['/delivery/suppliers', createdSupplier.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
