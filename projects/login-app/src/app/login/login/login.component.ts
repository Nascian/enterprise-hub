import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/shared-lib/src/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService
    ,private fb: FormBuilder ,
   private router: Router) { }

  ngOnInit(): void {


        this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.loggedIn();
    }
  }

  onSubmit(): void {
   
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data:any) => {
          this.loggedIn();
        },
        error: (err:any) => {
          
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }

    
  }

  msalLogin() {
    this.authService.msalLogin().subscribe(
      (data:any) => {
        this.loggedIn();
      }
    );
  }



  googleLogin() {
    this.authService.googleLogin().subscribe(
      (r:any) => {       
       this.loggedIn();
      }
    );
  }


  private loggedIn() {
    this.isLoginFailed = false;
    this.isLoggedIn = true;

      this.router.navigate(['./dashboard']).then(() => {
        window.location.reload();
      }); 

  }

}

