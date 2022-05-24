import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from '../examination.model';
import { ExaminationService } from '../examination.service';

@Component({
  selector: 'app-examination-details',
  templateUrl: './examination-details.component.html',
  styleUrls: ['./examination-details.component.scss']
})
export class ExaminationDetailsComponent implements OnInit {

  examination!: Examination;

  constructor(
    private activatedRoute: ActivatedRoute) 
  {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
        this.examination = data.examination
    })
  }
}
