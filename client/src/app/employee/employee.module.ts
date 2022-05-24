import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeResolverService } from './employee-resolver.service';
import { EmployeeFormComponent } from './shared/employee-form/employee-form.component';
  
@NgModule({
    declarations: [
        EmployeeListComponent,
        EditEmployeeComponent,
        NewEmployeeComponent,
        EmployeeDetailsComponent,
        EmployeeFormComponent
    ],
    imports: [ 
        CommonModule,
        SharedModule,
        EmployeeRoutingModule
    ],
    providers: [
        EmployeeResolverService
    ]
})
export class EmployeeModule { }