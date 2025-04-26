import {Injectable} from '@angular/core';
import {Project} from "../Models/project";
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = `${environment.apiUrl}/project`;
  projects: Project[] = []

  constructor(private http: HttpClient) {}


  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  updateProject(id: number, projectDTO: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, projectDTO);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProjectsByCostLessThan(maxCost: number): Observable<Project[]> {
    let params = new HttpParams().set('max', maxCost.toString());
    return this.http.get<Project[]>(`${this.baseUrl}/cost`, { params });
  }

  getFilteredProjects(filters: any) {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);
    if (filters.certified !== null && filters.certified !== undefined) params = params.set('certified', filters.certified);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.mechanism) params = params.set('mechanism', filters.mechanism);
    if (filters.cost) params = params.set('cost', filters.cost);
    if (filters.country) params = params.set('country', filters.country);

    return this.http.get<Project[]>(`${this.baseUrl}/filter`, { params });
  }

  getPaginatedProjects(skip = 1, limit = 10): Observable<any> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.baseUrl}/paginated`, { params });
  }
}
