import { Injectable } from '@angular/core'
import { Adapter } from '../core/adapter';
import { IPatient, Patient } from '../patient/patient.model';
import { ITest, Test } from '../test/test.model'

export interface IExamination {
    id: number
    arrangedAt: Date
    referal: boolean
    result: boolean | null

    test: ITest | null
    patient: IPatient | null
}

export class Examination  implements IExamination{
    constructor(
        public id: number,
        public arrangedAt: Date, 
        public referal: boolean, 
        public result: boolean | null
    ){}

    public test: Test | null = null;
    public patient: Patient | null = null;
}

@Injectable({
    providedIn: "root",
  })
export class ExaminationAdapter implements Adapter<Examination> {
    adapt(data: IExamination): Examination {
        return new Examination(
            data.id, new Date(data.arrangedAt), data.referal, data.result);
    }
}