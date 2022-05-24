import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { SupplierResolverService } from './supplier/supplier-resolver.service';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { NewSupplierComponent } from './supplier/new-supplier/new-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { SupplierDetailsComponent } from './supplier/supplier-details/supplier-details.component';
import { SupplierFormComponent } from './supplier/supplier-form/supplier-form.component';
import { NewDeliveryComponent } from './new-delivery/new-delivery.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { DeliveryResolverService } from './delivery-resolver.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        DeliveryListComponent,
        NewSupplierComponent,
        EditSupplierComponent,
        SupplierDetailsComponent,
        SupplierFormComponent,
        NewDeliveryComponent,
        EditDeliveryComponent,
        DeliveryDetailsComponent,
        DeliveryFormComponent
    ],
    imports: [ 
        CommonModule,
        SharedModule,
        DeliveryRoutingModule,
        MatExpansionModule,
        MatDividerModule,
        MatTabsModule,
        MatSlideToggleModule
    ],
    providers: [
        SupplierResolverService,
        DeliveryResolverService
    ]
})
export class DeliveryModule { }