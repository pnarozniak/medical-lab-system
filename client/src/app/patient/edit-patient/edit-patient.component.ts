import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  patient!: Patient;

  constructor(private patientService: PatientService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private toastrService: ToastrService,
      private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.patient = data.patient;
    })
  }

  editPatient = (modifiedPatient: Patient): Observable<HttpErrorResponse> => {
    var subject = new Subject<HttpErrorResponse>();

    this.patientService.edit(this.patient.id, modifiedPatient)
      .subscribe({
        next: _ => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.PATIENT_EDITED"))
          this.router.navigate(['/patients', this.patient.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
