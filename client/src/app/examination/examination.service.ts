import { Examination, ExaminationAdapter, IExamination } from "./examination.model";
import { map, Observable } from "rxjs";
import { ApiService } from "../core/api.service"
import { Injectable } from "@angular/core";
import { PatientAdapter } from "../patient/patient.model";
import { TestAdapter } from "../test/test.model";

@Injectable({
    providedIn: "root"
})
export class ExaminationService {

    constructor(
        private apiService: ApiService,
        private examinationAdapter: ExaminationAdapter,
        private patientAdapter: PatientAdapter,
        private testAdapter: TestAdapter
    ){}

    list() : Observable<Examination[]> {
        return this.apiService.get<IExamination[]>('/examinations').pipe(
            map((patients:IExamination[]) => patients.map((e: IExamination) => this.examinationAdapter.adapt(e))))
    }

    details(idExamination: number) : Observable<Examination> {
        return this.apiService.get<IExamination>(`/examinations/${idExamination}`).pipe(
            map((e: IExamination) => {
                const examination = this.examinationAdapter.adapt(e)

                examination.patient = e.patient && this.patientAdapter.adapt(e.patient)
                examination.test = e.test && this.testAdapter.adapt(e.test)
                
                return examination
            }))
    }

    create(newExamination: Examination) : Observable<IExamination> {
        return this.apiService.post<Examination, IExamination>('/examinations', newExamination)
    }

    edit(examinationId: number, modifiedExamination: Examination) : Observable<any> {
        return this.apiService.put<Examination, any>(`/examinations/${examinationId}`, modifiedExamination)
    }

    delete(examinationId: number) : Observable<any> {
        return this.apiService.delete<any>(`/examinations/${examinationId}`)
    }
}