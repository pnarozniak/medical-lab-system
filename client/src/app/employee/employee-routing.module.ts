import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolverService } from './employee-resolver.service';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  }, 
  {
    path: ':id/details',
    component: EmployeeDetailsComponent,
    resolve: {
      employee: EmployeeResolverService
    }
  },
  {
    path: ':id/edit', 
    component: EditEmployeeComponent,
    resolve: {
      employee: EmployeeResolverService
    }
  },
  {
    path: 'new',
    component: NewEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }