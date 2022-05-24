import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { EditExaminationComponent } from './edit-examination/edit-examination.component';
import { ExaminationDetailsComponent } from './examination-details/examination-details.component';
import { ExaminationListComponent } from './examination-list/examination-list.component';
import { ExaminationResolverService } from './examination-resolver.service';
import { NewExaminationComponent } from './new-examination/new-examination.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationListComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator', 'laborant']}
  }, 
  {
    path: ':id/details',
    component: ExaminationDetailsComponent,
    resolve: {
      examination: ExaminationResolverService
    },
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator', 'laborant']}
  },
  {
    path: ':id/edit', 
    component: EditExaminationComponent,
    resolve: {
      examination: ExaminationResolverService
    },
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator', 'laborant']}
  },
  {
    path: 'new',
    component: NewExaminationComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: ['admin', 'registrator']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }