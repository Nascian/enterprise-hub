
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';


const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private storageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token = this.storageService.getToken();   
    
    
  
    if (token != null && !req.url.includes('auth') && !req.url.includes('browse')) {
     
      let request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(request);
    } 
    
    return next.handle(req);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

     
      // TODO: better job of transforming error for user consumption
      
      

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };

  }

}



