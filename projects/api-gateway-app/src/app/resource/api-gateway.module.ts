import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, NgModule, Optional } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { LimitComponent } from './limit/limit.component';
import { RouteComponent } from './route/route.component';
import { RoutesComponent } from './routes/routes.component';
import { environment } from 'projects/shared-lib/src/environments/environment';



export const PARAMETER_TOKEN = new InjectionToken<any>('ParameterToken');

const routes: Routes = [
   { path: '', component: RoutesComponent },  
];

@NgModule({
  declarations: [
    RouteComponent,
    LimitComponent,
    RoutesComponent
  ],
  imports: [
    ClarityModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [
    { provide: PARAMETER_TOKEN, useValue: 'defaultParameter' } // default value if needed
  ],
})
export class ApiGatewayModule { 

  constructor(@Optional()  @Inject('shellConfig') public shellConfig: any){
    if(this.shellConfig){
      environment.apiConfig = this.shellConfig; 
    }
  }

}
