import { Observable } from "rxjs";
import { ApiService } from "../core/api.service"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class DeliveryContentService {

    constructor(
        private apiService: ApiService
    ){}

    create(newDeliveryContent: any[]) : Observable<any> {
        return this.apiService.post<any[], any>('/delivery-content', newDeliveryContent)
    }
}