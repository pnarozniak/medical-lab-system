import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { DeliveryContentService } from '../delivery-content.service';
import { Delivery, IDelivery } from '../delivery.model';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.component.html',
  styleUrls: ['./new-delivery.component.scss']
})
export class NewDeliveryComponent implements OnInit {

  constructor(private deliveryService: DeliveryService,
    private deliveryContentService: DeliveryContentService,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }

  createDelivery = (newDelivery: Delivery, newDeliveryContent: any[]): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.deliveryService.create(newDelivery)
      .subscribe({
        next: (createdDelivery: IDelivery) => {
          newDeliveryContent = newDeliveryContent.map(x => {
            x.deliveryId = createdDelivery.id
            return x
          })
          this.deliveryContentService.create(newDeliveryContent)
            .subscribe({
              next: _ => {
                this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.DELIVERY_CREATED"))
                this.router.navigate(['/delivery', createdDelivery.id, 'details'])
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
