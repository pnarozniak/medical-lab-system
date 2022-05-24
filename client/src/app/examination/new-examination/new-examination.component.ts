import { Component, OnInit } from '@angular/core';
import { Examination, IExamination } from '../examination.model';
import { ExaminationService } from '../examination.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-new-examination',
  templateUrl: './new-examination.component.html',
  styleUrls: ['./new-examination.component.scss']
})
export class NewExaminationComponent implements OnInit {

  constructor(private examinationService: ExaminationService,
    private toastrService: ToastrService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }

  createExamination = (newExamination: Examination) : Observable<HttpErrorResponse> => {
    const subject = new Subject<HttpErrorResponse>()

    this.examinationService.create(newExamination)
      .subscribe({
        next: (createdExamination: IExamination) => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.EXAMINATION_CREATED"))
          this.router.navigate(['/examinations', createdExamination.id, 'details'])
          subject.complete()
        },
        error: err => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
