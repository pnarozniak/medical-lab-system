import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from '../../delivery.model';
import { Supplier } from '../supplier.model';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

  supplier!: Supplier

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
        this.supplier = data.supplier
    })
  }

  showDeliveryDetails(delivery: Delivery) : void{
    this.router.navigate(['/delivery', delivery.id, 'details'])
  }
}
