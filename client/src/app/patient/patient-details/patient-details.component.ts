import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from 'src/app/examination/examination.model';
import { Patient } from '../patient.model';

@Component({
  selector: 'patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  patient!: Patient

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) 
  {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
        this.patient = data.patient
    })
  }

  showExaminationDetails(examination: Examination) : void{
    this.router.navigate(['/examinations', examination.id, 'details'])
  }
}
