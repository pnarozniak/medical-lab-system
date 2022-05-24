import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ExaminationRoutingModule } from './examination-routing.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { ExaminationDetailsComponent } from './examination-details/examination-details.component';
import { ExaminationListComponent } from './examination-list/examination-list.component';
import { NewExaminationComponent } from './new-examination/new-examination.component';
import { EditExaminationComponent } from './edit-examination/edit-examination.component';
import { ExaminationFormComponent } from './shared/examination-form/examination-form.component';

import { ExaminationResolverService } from './examination-resolver.service'

  
@NgModule({
    declarations: [
        ExaminationDetailsComponent,
        ExaminationListComponent,
        NewExaminationComponent,
        EditExaminationComponent,
        ExaminationFormComponent,
    ],
    imports: [ 
        CommonModule,
        ExaminationRoutingModule,
        SharedModule,
        NgxMaterialTimepickerModule
    ],
     providers: [
        ExaminationResolverService
    ]
})
export class ExaminationModule { }