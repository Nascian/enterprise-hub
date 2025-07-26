import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AuthAppProvider } from './auth.app.provider';
import { environment } from 'projects/shared-lib/src/environments/environment';
import { UserApp } from './core';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, 
    private storageService: LocalStorageService,
    private dbAuth : AuthAppProvider,
     private router: Router
    ) {}

  login(data:any): Observable<any> {
    return this.dbAuth.login(data);
  }


  googleLogin(): Observable<any> {
    return this.dbAuth.login(null);
  }

  msalLogin() : Observable<any> {
    return this.dbAuth.login(null);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiConfig.apiUrl + '/auth/signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const user = this.getUser();
  
    if (user && user.provider === 'msal') {
      this.storageService.cleanUser();
    } else if (user && user.provider === 'app') {
      this.storageService.cleanUser();
    } else {
      this.storageService.cleanUser();
    }
  
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  
    return new Observable(); // You should instantiate the Observable properly.
  }

  isAuthenticated() {
    return this.storageService.isLoggedIn();
  }

  getUser(): UserApp | null{
    return this.storageService.getUser();
  }
}
