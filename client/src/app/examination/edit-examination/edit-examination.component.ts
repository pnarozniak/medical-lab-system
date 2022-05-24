import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from '../examination.model';
import { ExaminationService } from '../examination.service';
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-examination',
  templateUrl: './edit-examination.component.html',
  styleUrls: ['./edit-examination.component.scss']
})
export class EditExaminationComponent implements OnInit {

  examination!: Examination;

  constructor(private examinationService: ExaminationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private toastrService: ToastrService,
      private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.examination = data.examination;
    })
  }

  editExamination = (modifiedExamination: Examination): Observable<HttpErrorResponse> => {
    const subject = new Subject<HttpErrorResponse>()

    this.examinationService.edit(this.examination.id, modifiedExamination)
      .subscribe({
        next: _ => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.EXAMINATION_EDITED"))
          this.router.navigate(['/examinations', this.examination.id, 'details'])
          subject.complete()
        },
        error: err => {
          subject.next(err)
        }
      })

    return subject.asObservable()
  }
}
