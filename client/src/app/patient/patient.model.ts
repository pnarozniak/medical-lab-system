import { Injectable } from '@angular/core'
import { Adapter } from '../core/adapter';
import { Examination, IExamination } from '../examination/examination.model';

export interface IPatient {
    id: number,
    firstName: string, 
    lastName: string, 
    birthdate: Date, 
    gender: number,
    email: string,
    phoneNumber: string,

    examinations: IExamination[]
}

export class Patient implements IPatient {
    constructor(
        public id: number,
        public firstName: string, 
        public lastName: string, 
        public birthdate: Date, 
        public gender: number,
        public email: string,
        public phoneNumber: string,
    ){}

    public examinations: Examination[] = []
}

@Injectable({
    providedIn: "root",
  })
export class PatientAdapter implements Adapter<Patient> {
    adapt(data: IPatient | any): Patient {
        return new Patient(
            data?.id, data.firstName, data.lastName, new Date(data.birthdate), 
            data.gender, data.email, data.phoneNumber);
    }
}