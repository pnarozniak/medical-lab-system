import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service'
import { Test } from '../test.model'
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {

  tests: Test[] = []

  constructor(private testService: TestService, 
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private authService: AuthService) 
  {}

  ngOnInit(): void {
    this.fetchTests()
  }

  private fetchTests() : void {
    this.testService.list().subscribe(tests => {
      this.tests = tests
    })
  }

  tryDelete = (deletedTest: Test) : void => {
    const canDelete = this.authService.loggedUser?.hasRole(['admin', 'laborant'])
    
    if (!canDelete) {
      this.toastrService.error(
        this.translate.instant("ALERTS.ERROR.NO_ACCESS")
      )
      return
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: this.translate.instant('TESTS.TRY_DELETE_TITLE'), 
        details: `${this.translate.instant('TESTS.NAME')}: ${deletedTest.name}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      this.delete(deletedTest.id)
    });
  }

  private delete = (deletedTestId: number) : void => {
    this.testService.delete(deletedTestId)
    .subscribe({
      next: _ => {
        this.toastrService.success(this.translate.instant('ALERTS.SUCCESS.TEST_DELETED'))
      },
      error: _ => {
        this.toastrService.error(this.translate.instant('ALERTS.ERROR.TEST_NOT_DELETED'))
      },
      complete: () => {
        this.fetchTests()
      }
    })
  }
}
