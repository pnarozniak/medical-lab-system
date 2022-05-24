import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientResolverService } from './patient-resolver.service';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AuthGuard } from '../core/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator', 'laborant']}
  }, 
  {
    path: ':id/details',
    component: PatientDetailsComponent,
    resolve: {
      patient: PatientResolverService
    },
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator', 'laborant']}
  },
  {
    path: 'new',
    component: NewPatientComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator']}
  },
  {
    path: ':id/edit',
    component: EditPatientComponent,
    resolve: {
      patient: PatientResolverService
    },
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }