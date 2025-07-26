import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsAppProvider } from './analytics.app.provider';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private analyticsProvider: AnalyticsAppProvider) {}

  getAnalytics(): Observable<any> {
    return this.analyticsProvider.getAnalytics();
  }

  getAnalyticsById(id: string): Observable<any> {
    return this.analyticsProvider.getAnalyticsById(id);
  }

  createAnalytics(data: any): Observable<any> {
    return this.analyticsProvider.createAnalytics(data);
  }

  updateAnalytics(id: string, data: any): Observable<any> {
    return this.analyticsProvider.updateAnalytics(id, data);
  }

  deleteAnalytics(id: string): Observable<any> {
    return this.analyticsProvider.deleteAnalytics(id);
  }
}
