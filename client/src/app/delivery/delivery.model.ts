import { Injectable } from '@angular/core'
import { Adapter } from '../core/adapter';
import { IDeliveryContent } from './delivery-content.model';
import { Supplier, ISupplier } from './supplier/supplier.model';


export interface IDelivery {
    id: number,
    plannedAt: Date, 
    deliveredAt: Date | null, 
    comments: string | null

    supplier: ISupplier | null
    deliveryContent: IDeliveryContent[]
}

export class Delivery implements IDelivery {
    constructor(
        public id: number,
        public plannedAt: Date,
        public deliveredAt: Date | null,
        public comments: string | null
    ) { }

    public supplier: Supplier | null = null
    public deliveryContent: IDeliveryContent[] = []
}

@Injectable({
    providedIn: "root",
  })
export class DeliveryAdapter implements Adapter<Delivery> {
    adapt(data: IDelivery | any): Delivery {
        return new Delivery(
            data.id,
            new Date(data.plannedAt),
            data.deliveredAt ? new Date(data.deliveredAt) : null,
            data.comments);
    }
}