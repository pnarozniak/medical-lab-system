import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Delivery } from '../delivery.model';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.scss']
})
export class EditDeliveryComponent implements OnInit {

  delivery!: Delivery;
  deliveryContent: any[] = []
  
  constructor(private activatedRoute: ActivatedRoute,
    private deliveryService: DeliveryService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.delivery = data.delivery;

      if (!this.delivery.deliveryContent) return

      this.deliveryContent = this.delivery.deliveryContent.map(dc => {
        return {
          id: dc.id,
          amount: dc.amount,
          expiresAt: dc.expiresAt,
          testId: dc.test!.id,
          testName: dc.test!.name
        }
      })
    })
  }

  editDelivery = (modifiedDelivery: Delivery, modifiedDeliveryContent: any[]): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();
    
    this.deliveryService.edit(this.delivery.id, modifiedDelivery)
      .subscribe({
        next: _ => {
          this.deliveryService.editContent(this.delivery.id, modifiedDeliveryContent)
            .subscribe({
              next: _ => {
                this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.DELIVERY_EDITED"))
                this.router.navigate(['/delivery', this.delivery.id, 'details'])
                subject.complete()
              },
              error: (err: HttpErrorResponse) => {
                subject.next(err)
              }
            })
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })
      
      return subject.asObservable()
  }

}
