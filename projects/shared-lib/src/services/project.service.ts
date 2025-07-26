import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'projects/shared-lib/src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    // Llama al API Gateway, que debe enrutar a project-service
    return this.http.get(
      environment.apiConfig.apiUrl + '/project-service/projects',
      httpOptions
    );
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(
      environment.apiConfig.apiUrl + `/project-service/projects/${id}`,
      httpOptions
    );
  }

  createProject(data: any): Observable<any> {
    return this.http.post(
      environment.apiConfig.apiUrl + '/project-service/projects',
      data,
      httpOptions
    );
  }

  updateProject(id: string, data: any): Observable<any> {
    return this.http.put(
      environment.apiConfig.apiUrl + `/project-service/projects/${id}`,
      data,
      httpOptions
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(
      environment.apiConfig.apiUrl + `/project-service/projects/${id}`,
      httpOptions
    );
  }
}
