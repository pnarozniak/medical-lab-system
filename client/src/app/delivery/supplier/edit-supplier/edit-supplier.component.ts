import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {

  supplier!: Supplier;

  constructor(private supplierService: SupplierService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private toastrService: ToastrService,
      private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.supplier = data.supplier;
    })
  }

  editSupplier = (modifiedSupplier: Supplier): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.supplierService.edit(this.supplier.id, modifiedSupplier)
      .subscribe({
        next: _ => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.SUPPLIER_EDITED"))
          this.router.navigate(['/delivery/suppliers', this.supplier.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
