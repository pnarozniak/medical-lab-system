import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employee!: Employee

  constructor(
    private activatedRoute: ActivatedRoute) 
  {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
        this.employee = data.employee
    })
  }
}
