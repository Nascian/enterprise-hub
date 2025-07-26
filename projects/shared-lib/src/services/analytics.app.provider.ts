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
export class AnalyticsAppProvider {
  constructor(private http: HttpClient) {}

  getAnalytics(): Observable<any> {
    return this.http.get(
      environment.apiConfig.apiUrl + '/analytics-service/analytics',
      httpOptions
    );
  }

  getAnalyticsById(id: string): Observable<any> {
    return this.http.get(
      environment.apiConfig.apiUrl + `/analytics-service/analytics/${id}`,
      httpOptions
    );
  }

  createAnalytics(data: any): Observable<any> {
    return this.http.post(
      environment.apiConfig.apiUrl + '/analytics-service/analytics',
      data,
      httpOptions
    );
  }

  updateAnalytics(id: string, data: any): Observable<any> {
    return this.http.put(
      environment.apiConfig.apiUrl + `/analytics-service/analytics/${id}`,
      data,
      httpOptions
    );
  }

  deleteAnalytics(id: string): Observable<any> {
    return this.http.delete(
      environment.apiConfig.apiUrl + `/analytics-service/analytics/${id}`,
      httpOptions
    );
  }
}
