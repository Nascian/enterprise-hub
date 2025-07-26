import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/shared-lib/src/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {


  
    constructor(private router: Router, private authService: AuthService) {
    }
  
  
    ngOnInit(): void {
  
      if(!this.authService.isAuthenticated()){
        this.router.navigate(['./login']);
      }
    }

}
