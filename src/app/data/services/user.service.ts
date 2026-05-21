import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    constructor() { }

    
    getUser(token:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
    }

    updateUser(data: any): Observable<any> {        
        return this.http.put<any>(`${this.apiUrl}/users`,data);
    }

    updatePass(data:any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/users/password`,data);
    }

    updateToken(data:any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/users/token`,data);
    }
           
}   