import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatRadioModule } from '@angular/material/radio'
import { ReactiveFormsModule } from '@angular/forms'
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { GenericTableComponent } from './generic-table/generic-table.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    declarations: [
        GenericTableComponent,
        ConfirmationDialogComponent,
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule
     ],
    exports: [
        GenericTableComponent,
        RouterModule,
        MatDialogModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule,MatRadioModule,MatAutocompleteModule,MatCardModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class SharedModule { }