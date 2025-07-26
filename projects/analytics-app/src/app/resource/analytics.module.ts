import { CommonModule } from '@angular/common';
import { Inject, InjectionToken, NgModule, Optional } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClarityIcons, exclamationTriangleIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { environment } from 'projects/shared-lib/src/environments/environment';
import { KeysPipe } from '../../services/pipes/keys.pipe';
import { AnalyticsComponent } from './analytics/analytics.component';

// Load the icons
ClarityIcons.addIcons(
  exclamationTriangleIcon,

);

export const PARAMETER_TOKEN = new InjectionToken<any>('ParameterToken');

const routes: Routes = [
   { path: '', component: AnalyticsComponent },  
];

@NgModule({
  declarations: [
    KeysPipe
  ],
  imports: [
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    AnalyticsComponent // Importa el standalone component aquí
  ],
  exports: [],
  providers: [
    { provide: PARAMETER_TOKEN, useValue: 'defaultParameter' } // default value if needed
  ],
})
export class AnalyticsModule {
  
  constructor(@Optional()  @Inject('shellConfig') public shellConfig: any){
    if(this.shellConfig){
      environment.apiConfig = this.shellConfig; 
    }
  }

 }
