import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, NgModule, Optional } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'projects/shared-lib/src/environments/environment';


export const PARAMETER_TOKEN = new InjectionToken<any>('ParameterToken');


const routes: Routes = [
  { path: '', component: LoginComponent },  // Set path to '' to act as the default route for this module
];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: PARAMETER_TOKEN, useValue: 'defaultParameter' } // default value if needed
  ],
})
export class LoginModule { 

  
  constructor(@Optional()  @Inject('shellConfig') public shellConfig: any){
    if(this.shellConfig){
      environment.apiConfig = this.shellConfig; 
    }
  }
}
