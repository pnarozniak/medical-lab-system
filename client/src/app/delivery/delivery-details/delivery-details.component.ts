import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Delivery } from '../delivery.model';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  delivery!: Delivery

  constructor(
    private activatedRoute: ActivatedRoute) 
  {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.delivery = data.delivery
    })
  }
}
