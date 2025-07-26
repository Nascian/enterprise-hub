import { AuthLibService } from 'auth-lib';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'projects/shared-lib/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shell';

  

  constructor(private authService: AuthService,     private router: Router) {
    //this.service.login('Max', null);
    if(!authService.isAuthenticated()){
      this.router.navigate(['./login/']);
    }
    
  }

}

