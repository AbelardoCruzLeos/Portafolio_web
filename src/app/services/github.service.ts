import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getAllRepos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(`${this.apiUrl}/users/Umblum12/repos`, {
      headers,
    });
  }
}
