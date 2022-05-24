import { Injectable } from '@angular/core'
import { Adapter } from '../core/adapter'
import { ITimeOnly, TimeOnly } from '../core/time-only.model'
import { Examination, IExamination } from '../examination/examination.model'

export interface ITest {
    id: number
    name: string
    effectiveness: number
    estimatedDuration: string
    contraindications: string

    examinations: IExamination[]
}

export class Test implements ITest {
    constructor(
        public id: number,
        public name: string,
        public effectiveness: number,
        public estimatedDuration: string,
        public contraindications: string
    ){}

    public parsedEstimatedDuration: TimeOnly | null = null
    public examinations: Examination[] = []
}

@Injectable({
    providedIn: 'root'
})
export class TestAdapter implements Adapter<Test> {
    adapt(data: ITest | any): Test {
        const test = new Test(
            data.id, data.name, data.effectiveness, 
            data.estimatedDuration, data.contraindications)
        
        const values : number[] = data.estimatedDuration?.split(':').map((e: string) => parseInt(e)) ?? []
        if (values.length === 3)
            test.parsedEstimatedDuration = new TimeOnly(values[0], values[1], values[2])

        return test
    }
}