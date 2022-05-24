import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(private patientService: PatientService,
      private dialog: MatDialog,
      private toastrService: ToastrService,
      private translate: TranslateService,
      private authService: AuthService) 
  {}

  ngOnInit(): void {
    this.fetchPatients()
  }

  private fetchPatients(): void {
    this.patientService.list().subscribe(patients => {
      this.patients = patients
    })
  }

  tryDelete = (deletedPatient: Patient) : void => {
    const canDelete = this.authService.loggedUser?.hasRole(['admin', 'registrator'])
    
    if (!canDelete) {
      this.toastrService.error(
        this.translate.instant("ALERTS.ERROR.NO_ACCESS")
      )
      return
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: this.translate.instant('PATIENTS.TRY_DELETE_TITLE'), 
        details: `${deletedPatient.firstName} ${deletedPatient.lastName} (${deletedPatient.email})`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      this.delete(deletedPatient.id)
    });
  }

  private delete = (deletedPatientId: number) : void => {
    this.patientService.delete(deletedPatientId)
    .subscribe({
      next: _ => {
        this.toastrService.success(this.translate.instant('ALERTS.SUCCESS.PATIENT_DELETED'))
      },
      error: _ => {
        this.toastrService.error(this.translate.instant('ALERTS.ERROR.PATIENT_NOT_DELETED'))
      },
      complete: () => {
        this.fetchPatients()
      }
    })
  }
  
}
