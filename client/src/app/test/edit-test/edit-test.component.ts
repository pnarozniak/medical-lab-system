import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../test.model';
import { TestService } from '../test.service';
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {

  test!: Test;

  constructor(private testService: TestService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private toastrService: ToastrService,
      private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.test = data.test;
    })
  }

  editTest = (modifiedTest: Test): Observable<HttpErrorResponse> => {
    const subject = new Subject<HttpErrorResponse>()

    this.testService.edit(this.test.id, modifiedTest)
      .subscribe({
        next: _ => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.TEST_EDITED"))
          this.router.navigate(['/tests', this.test.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
