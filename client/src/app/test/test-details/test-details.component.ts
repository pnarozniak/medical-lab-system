import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from 'src/app/examination/examination.model';
import { Test } from '../test.model';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnInit {
  test!: Test

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
        this.test = data.test
    })
  }

  showExaminationDetails(examination: Examination) : void{
    this.router.navigate(['/examinations', examination.id, 'details'])
  }
}
