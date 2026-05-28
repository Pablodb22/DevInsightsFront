import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GithubService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    constructor() { }
        
    getDataGit(token:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/github/data`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    }
           
}   