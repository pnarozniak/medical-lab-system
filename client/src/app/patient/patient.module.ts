import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module'

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientFormComponent } from './shared/patient-form/patient-form.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

import { PatientResolverService } from './patient-resolver.service';

@NgModule({
    declarations: [
        PatientListComponent,
        PatientDetailsComponent,
        NewPatientComponent,
        PatientFormComponent,
        EditPatientComponent,
    ],
    imports: [ 
        CommonModule,
        PatientRoutingModule,
        SharedModule,
    ],
     providers: [
         PatientResolverService,
     ]
})
export class PatientModule { }