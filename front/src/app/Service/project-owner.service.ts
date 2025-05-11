import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectOwnerService {
  private apiUrl = `${environment.apiUrl}/api/project-owners`;

  constructor(private http: HttpClient) {}

  createProjectOwner(projectOwnerData: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, projectOwnerData);
  }

  getProjectOwnerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
