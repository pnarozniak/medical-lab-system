import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable()
export class ApiService {
    private baseUrl : string = "http://localhost:3000/api";

    constructor(private httpClient: HttpClient) {   }

    get<T>(url: string) : Observable<T> {
        return this.httpClient.get<T>(`${this.baseUrl}${url}`)
            .pipe(
                catchError(err => {
                    return throwError(()=>err);
                })
            )
    }

    post<T, R>(url: string, body: T): Observable<R> {
        return this.httpClient.post<R>(`${this.baseUrl}${url}`, body)
            .pipe(
                catchError(err => {
                    return throwError(()=>err);
                })
            )
    }

    postForBlob(url: string, body: any): Observable<Blob> {
        return this.httpClient.post(`${this.baseUrl}${url}`, body, {
            responseType: "blob",
            headers: new HttpHeaders().append("Content-Type", "application/json")
          });
    }

    put<T, R>(url: string, body: T) : Observable<R> {
        return this.httpClient.put<R>(`${this.baseUrl}${url}`, body)
            .pipe(
                catchError(err => {
                    return throwError(()=>err);
                })
            )
    }

    delete<T>(url: string) : Observable<T> {
        return this.httpClient.delete<T>(`${this.baseUrl}${url}`)
    }
}