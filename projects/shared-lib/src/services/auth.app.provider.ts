import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthProvider, UserApp } from './core';
import { LocalStorageService } from './local-storage.service';

import jwtDecode from 'jwt-decode';
import { environment } from 'projects/shared-lib/src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class AuthAppProvider implements AuthProvider{
  constructor(private http: HttpClient, private storageService: LocalStorageService) {}

  login(data:any): Observable<any> {
    // This URL correctly includes '/auth-service/' and will be routed by the Gateway
    console.log(environment.apiConfig.apiUrl + '/auth-service/auth/signin');

    var result = this.http.post(
      environment.apiConfig.apiUrl + '/auth-service/auth/signin',
      data,
      httpOptions
    );


    result.subscribe((r:any) => {
   
      var at = r.accessToken;
 
    
      var decoded = jwtDecode(at);
       
      let user = Object.assign(new UserApp(), decoded);

      user.jobTitle = '';
      user.accessToken =at
      this.storageService.saveUser(user);
    });
    return result;
  }

  register(data:any): Observable<any> {
    // MODIFIED: Added '/auth-service/' prefix to match the Gateway's predicate
    // This ensures the request is routed through your 'auth-service' route in the Gateway
    return this.http.post(
      environment.apiConfig.apiUrl + '/auth-service/auth/signup', // Changed from '/auth/signup'
      data,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return new Observable;
  }

  isAuthenticated() {
    return this.storageService.isLoggedIn();
  }

  getUser(){
    return this.storageService.getUser();
  }
}
// This function 'r' seems to be a leftover or placeholder, not used in the class.
// Removing it if it's not intended to be there.
// function r(value: Object): void {
//   throw new Error('Function not implemented.');
// }
