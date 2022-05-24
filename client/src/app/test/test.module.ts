import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TestRoutingModule } from './test-routing.module'

import { TestListComponent } from './test-list/test-list.component';
import { TestDetailsComponent } from './test-details/test-details.component';

import { TestFormComponent } from './shared/test-form/test-form.component';
import { NewTestComponent } from './new-test/new-test.component';
import { EditTestComponent } from './edit-test/edit-test.component'

import { TestResolverService } from './test-resolver.service';

@NgModule({
    declarations: [
        TestListComponent,
        TestDetailsComponent,
        TestFormComponent,
        NewTestComponent,
        EditTestComponent
    ],
    imports: [
        CommonModule,
        TestRoutingModule,
        SharedModule,
    ],
    providers: [
        TestResolverService
    ],
})
export class TestModule {   }