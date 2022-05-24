import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPatient, Patient } from '../patient.model';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {
  
  constructor(private patientService: PatientService,
      private router: Router,
      private toastrService: ToastrService,
      private translate: TranslateService) { }

  ngOnInit(): void {
  }

  createPatient = (newPatient: Patient): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.patientService.create(newPatient)
      .subscribe({
        next: (createdPatient: IPatient) => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.PATIENT_CREATED"))
          this.router.navigate(['/patients', createdPatient.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
