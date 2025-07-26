import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { ClarityModule } from '@clr/angular';
import { AuthLibModule } from 'auth-lib';
import { environment } from 'projects/shared-lib/src/environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { EventMessageComponent } from './components/messages/event-message.component';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { alarmClockIcon, barChartIcon, calendarIcon, ClarityIcons, cogIcon, dashboardIcon, dataClusterIcon, envelopeIcon, fileIcon, flagIcon, folderIcon, formIcon, imageIcon, mapIcon, nodesIcon, podIcon, switchIcon, tasksIcon, userIcon, xlsFileIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { RequestInterceptor } from 'projects/shared-lib/src/services/request-interceptor';

// Load the icons
ClarityIcons.addIcons(
  userIcon,
  switchIcon,
  dataClusterIcon,
  envelopeIcon,
  formIcon,
  dashboardIcon,
  folderIcon,
  calendarIcon,
  mapIcon,
  xlsFileIcon,
  alarmClockIcon,
  podIcon,
  cogIcon,
  nodesIcon,
  barChartIcon,
  tasksIcon,
  flagIcon,
  fileIcon,
  imageIcon
);
export function loggerCallback(logLevel: LogLevel, message: string) {
  
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: environment.msalConfig.auth.redirectUri,
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(environment.apiConfig.uriMe, environment.apiConfig.scopes);
  protectedResourceMap.set(environment.apiConfig.uriMemberOf, environment.apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes]
    },
    loginFailedRoute: '/login-failed'
  };
}



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NoopAnimationsModule,
    ClarityModule,
    AuthLibModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EventMessageComponent,
    HeaderComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

