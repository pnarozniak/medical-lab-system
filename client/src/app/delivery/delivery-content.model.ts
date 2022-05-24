import { Injectable } from '@angular/core'
import { Adapter } from '../core/adapter';
import { ITest, Test } from '../test/test.model';
import { Delivery, IDelivery } from './delivery.model';

export interface IDeliveryContent {
    id: number,
    amount: number,
    expiresAt: Date

    test: ITest | null,
    delivery: IDelivery | null,
}

export class DeliveryContent implements IDeliveryContent {
    constructor(
        public id: number,
        public amount: number,
        public expiresAt: Date
    ) { }

    test: Test | null = null
    delivery: Delivery | null = null
}

@Injectable({
    providedIn: "root",
  })
export class DeliveryContentAdapter implements Adapter<DeliveryContent> {
    adapt(data: IDeliveryContent | any): DeliveryContent {
        return new DeliveryContent(
            data.id,
            data.amount,
            new Date(data.expiresAt));
    }
}