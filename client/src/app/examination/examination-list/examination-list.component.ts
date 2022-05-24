import { Component, OnInit } from '@angular/core';
import { Examination } from '../examination.model';
import { ExaminationService } from '../examination.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr'
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit {

  examinations: Examination[] = []

  constructor(private examinationService: ExaminationService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private authService: AuthService) 
{}

  ngOnInit(): void {
    this.fetchExaminations()
  }

  private fetchExaminations(): void {
    this.examinationService.list().subscribe(examinations => {
      this.examinations = examinations
    })
  }

  tryDelete = (deletedExamination: Examination): void => {
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
        title: this.translate.instant('EXAMINATIONS.TRY_DELETE_TITLE'), 
        details: `${this.translate.instant('EXAMINATIONS.ARRANGED_AT')}: ${deletedExamination.arrangedAt.toLocaleString()}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

      this.delete(deletedExamination.id)
    });
  }

  private delete = (deletedExaminationId: number) : void => {
    this.examinationService.delete(deletedExaminationId)
    .subscribe({
      next: _ => {
        this.toastrService.success(this.translate.instant('ALERTS.SUCCESS.EXAMINATION_DELETED'))
      },
      error: _ => {
        this.toastrService.error(this.translate.instant('ALERTS.ERROR.EXAMINATION_NOT_DELETED'))
      },
      complete: () => {
        this.fetchExaminations()
      }
    })
  }
}
