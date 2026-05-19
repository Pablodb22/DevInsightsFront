import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    constructor() { }

    register(user: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/register`, user);
    }
}