import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import { ToastrService } from 'ngx-toastr'
import { ITest, Test } from '../test.model';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {

  constructor(private testService: TestService,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    
  }

  createTest = (newTest: Test): Observable<HttpErrorResponse> => {
    const subject = new Subject<HttpErrorResponse>()

    this.testService.create(newTest)
      .subscribe({
        next: (createdTest: ITest) => {
          this.toastrService.success(this.translate.instant("ALERTS.SUCCESS.TEST_CREATED"))
          this.router.navigate(['/tests', createdTest.id, 'details'])
          subject.complete()
        },
        error: (err: HttpErrorResponse) => {
          subject.next(err)
        }
      })

      return subject.asObservable()
  }
}
