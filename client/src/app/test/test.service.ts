import { ITest, Test, TestAdapter } from "./test.model";
import { map, Observable } from "rxjs";
import { ApiService } from "../core/api.service"
import { Injectable } from "@angular/core";
import { Examination, ExaminationAdapter, IExamination } from "../examination/examination.model";
import { PatientAdapter } from "../patient/patient.model";

@Injectable({
    providedIn: "root"
})
export class TestService {

    constructor(
        private apiService: ApiService,
        private testAdapter: TestAdapter,
        private patientAdapter: PatientAdapter,
        private examinationAdapter: ExaminationAdapter
    ){}

    list() : Observable<Test[]> {
        return this.apiService.get<ITest[]>('/tests').pipe(
            map((patients:ITest[]) => patients.map((t: ITest) => this.testAdapter.adapt(t))))
    }

    details(idTest: number) : Observable<Test> {
        return this.apiService.get<ITest>(`/tests/${idTest}`).pipe(
            map((t: ITest) => {
                const test = this.testAdapter.adapt(t)

                test.examinations = t.examinations.map((e: IExamination) => {
                    const examination: Examination = this.examinationAdapter.adapt(e)
                    examination.patient = e.patient && this.patientAdapter.adapt(e.patient)
                    return examination
                })

                return test
            })
        )
    }

    create(newTest: Test) : Observable<ITest> {
        return this.apiService.post<Test, ITest>('/tests', newTest)
    }

    edit(testId: number, modifiedTest: Test) : Observable<any> {
        return this.apiService.put<Test, any>(`/tests/${testId}`, modifiedTest)
    }

    delete(testId: number) : Observable<any> {
        return this.apiService.delete<any>(`/tests/${testId}`)
    }
}