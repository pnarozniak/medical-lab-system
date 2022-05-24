import { map, Observable } from "rxjs";
import { ApiService } from "../../core/api.service"
import { Injectable } from "@angular/core";
import { ISupplier, Supplier, SupplierAdapter } from "./supplier.model";
import { Delivery, DeliveryAdapter, IDelivery } from "../delivery.model";

@Injectable({
    providedIn: "root"
})
export class SupplierService {

    constructor(
        private apiService: ApiService,
        private supplierAdapter: SupplierAdapter,
        private deliveryAdapter: DeliveryAdapter
    ){}

    list() : Observable<Supplier[]> {
        return this.apiService.get<ISupplier[]>('/suppliers').pipe(
            map((supliers:ISupplier[]) => supliers.map((s: ISupplier) => this.supplierAdapter.adapt(s))))
    }

    delete(idSupplier: number) : Observable<any> {
        return this.apiService.delete<any>(`/suppliers/${idSupplier}`)
    }

    create(newSupplier: Supplier) : Observable<ISupplier> {
        return this.apiService.post<Supplier, ISupplier>('/suppliers', newSupplier)
    }

    edit(supplierId: number, modifiedSupplier: Supplier) : Observable<any> {
        return this.apiService.put<Supplier, any>(`/suppliers/${supplierId}`, modifiedSupplier)
    }

    details(idSupplier: number) : Observable<Supplier> {
        return this.apiService.get<ISupplier>(`/suppliers/${idSupplier}`).pipe(
            map((s: ISupplier) => {
                const supplier : Supplier = this.supplierAdapter.adapt(s)
                
                supplier.delivery = s.delivery.map((d: IDelivery) => {
                    const delivery : Delivery = this.deliveryAdapter.adapt(d)
                    return delivery
                })

                return supplier
            }))
    }
}