import { Patient, PatientAdapter, IPatient } from "./patient.model";
import { map, Observable } from "rxjs";
import { ApiService } from "../core/api.service"
import { Injectable } from "@angular/core";
import { Examination, ExaminationAdapter, IExamination } from "../examination/examination.model";
import { TestAdapter } from "../test/test.model";

@Injectable({
    providedIn: "root"
})
export class PatientService {

    constructor(
        private apiService: ApiService,
        private patientAdapter: PatientAdapter,
        private examinationAdapter: ExaminationAdapter,
        private testAdapter: TestAdapter
    ){}

    list() : Observable<Patient[]> {
        return this.apiService.get<IPatient[]>('/patients').pipe(
            map((patients:IPatient[]) => patients.map((p: IPatient) => this.patientAdapter.adapt(p))))
    }

    details(idPatient: number) : Observable<Patient> {
        return this.apiService.get<IPatient>(`/patients/${idPatient}`).pipe(
            map((p: IPatient) => {
                const patient : Patient = this.patientAdapter.adapt(p)
                
                patient.examinations = p.examinations.map((e: IExamination) => {
                    const examination : Examination = this.examinationAdapter.adapt(e)
                    examination.test = e.test && this.testAdapter.adapt(e.test)
                    return examination
                })

                return patient
            }))
    }

    create(newPatient: Patient) : Observable<IPatient> {
        return this.apiService.post<Patient, IPatient>('/patients', newPatient)
    }

    edit(patientId: number, modifiedPatient: Patient) : Observable<any> {
        return this.apiService.put<Patient, any>(`/patients/${patientId}`, modifiedPatient)
    }

    delete(patientId: number) : Observable<any> {
        return this.apiService.delete<any>(`/patients/${patientId}`)
    }
}