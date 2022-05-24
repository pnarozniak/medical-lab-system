import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { EditTestComponent } from './edit-test/edit-test.component';
import { NewTestComponent } from './new-test/new-test.component';

import { TestDetailsComponent } from './test-details/test-details.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestResolverService } from './test-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: TestListComponent,
        canActivate: [AuthGuard],
        data: {requiredRoles: ['admin', 'laborant', 'registrator']}
    }, 
    {
        path: ':id/details',
        component: TestDetailsComponent,
        resolve: {
            test: TestResolverService
        },
        canActivate: [AuthGuard],
        data: {requiredRoles: ['admin', 'registrator', 'laborant']}
    },
    {
        path: 'new',
        component: NewTestComponent,
        canActivate: [AuthGuard],
        data: {requiredRoles: ['admin', 'laborant']}
    },
    {
        path: ':id/edit',
        component: EditTestComponent,
        resolve: {
            test: TestResolverService
        },
        canActivate: [AuthGuard],
        data: {requiredRoles: ['admin', 'laborant']}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {   }