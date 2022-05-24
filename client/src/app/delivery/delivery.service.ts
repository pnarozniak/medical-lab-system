import { map, Observable } from "rxjs";
import { ApiService } from "../core/api.service"
import { Injectable } from "@angular/core";
import { Delivery, DeliveryAdapter, IDelivery } from "./delivery.model";
import { SupplierAdapter } from "./supplier/supplier.model";
import { DeliveryContent, DeliveryContentAdapter, IDeliveryContent } from "./delivery-content.model";
import { TestAdapter } from "../test/test.model";

@Injectable({
    providedIn: "root"
})
export class DeliveryService {

    constructor(
        private apiService: ApiService,
        private deliveryAdapter: DeliveryAdapter,
        private supplierAdapter: SupplierAdapter,
        private testAdapter: TestAdapter,
        private deliveryContentAdapter: DeliveryContentAdapter
    ){}

    list() : Observable<Delivery[]> {
        return this.apiService.get<IDelivery[]>('/delivery').pipe(
            map((delivery: IDelivery[]) => delivery.map((d: IDelivery) => {
                return this.deliveryAdapter.adapt(d)
            })))
    }

    delete(deliveryId: number) : Observable<any> {
        return this.apiService.delete<any>(`/delivery/${deliveryId}`)
    }

    create(newDelivery: Delivery) : Observable<IDelivery> {
        return this.apiService.post<Delivery, IDelivery>('/delivery', newDelivery)
    }

    details(idDelivery: number) : Observable<Delivery> {
        return this.apiService.get<any>(`/delivery/${idDelivery}`).pipe(
            map((d: any) => {
                const delivery: Delivery = this.deliveryAdapter.adapt(d)
                
                delivery.supplier = this.supplierAdapter.adapt(d.supplier)

                if (d.deliveryDeliveryContent)
                delivery.deliveryContent = d.deliveryDeliveryContent.map((dc: any) => {
                    const deliveryContent: DeliveryContent = this.deliveryContentAdapter.adapt(dc)
                    deliveryContent.test = this.testAdapter.adapt(dc.deliveryTest)
                    
                    return deliveryContent
                })

                return delivery
            }))
    }

    edit(idDelivery: number, modifiedDelivery: Delivery) : Observable<any> {
        return this.apiService.put<Delivery, any>(`/delivery/${idDelivery}`, modifiedDelivery)
    }

    editContent(idDelivery: number, newDeliveryContent: any[]) : Observable<any> {
        return this.apiService.put<any[], any>(`/delivery/${idDelivery}/content`, newDeliveryContent)
    }
}