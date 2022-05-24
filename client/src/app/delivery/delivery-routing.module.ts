import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryResolverService } from './delivery-resolver.service';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { NewDeliveryComponent } from './new-delivery/new-delivery.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { NewSupplierComponent } from './supplier/new-supplier/new-supplier.component';
import { SupplierDetailsComponent } from './supplier/supplier-details/supplier-details.component';
import { SupplierResolverService } from './supplier/supplier-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: DeliveryListComponent,
    },
    {
      path: 'suppliers/:id/details',
      component: SupplierDetailsComponent,
      resolve: {
        supplier: SupplierResolverService
      },
    },
    {
      path: 'suppliers/new',
      component: NewSupplierComponent,
    },
    {
      path: 'suppliers/:id/edit',
      component: EditSupplierComponent,
      resolve: {
        supplier: SupplierResolverService
      },
    },
    {
      path: 'new',
      component: NewDeliveryComponent,
    },
    {
      path: ':id/details',
      component: DeliveryDetailsComponent,
      resolve: {
        delivery: DeliveryResolverService
      }
    },
    {
      path: ':id/edit',
      component: EditDeliveryComponent,
      resolve: {
        delivery: DeliveryResolverService
      }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }