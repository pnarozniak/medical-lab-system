import { Injectable } from '@angular/core'
import { Adapter } from '../../core/adapter';
import { Delivery, IDelivery } from '../delivery.model';

export interface ISupplier {
    id: number,
    name: string, 
    contactEmail: string, 

    delivery: IDelivery[]
}

export class Supplier implements ISupplier {
    constructor(
        public id: number,
        public name: string, 
        public contactEmail: string, 
    ){}

    public delivery: Delivery[] = []
}

@Injectable({
    providedIn: "root",
  })
export class SupplierAdapter implements Adapter<Supplier> {
    adapt(data: ISupplier | any): Supplier {
        return new Supplier(
            data.id, data.name, data.contactEmail);
    }
}