import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';
import { environment } from 'projects/shared-lib/src/environments/environment';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: NotFoundComponent,
    pathMatch: 'full',
  },

  // Your route here:

  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'loginApp',
        exposedModule: './Module',
      }).then((m) => m.LoginModule),
      providers: [
        { provide: 'shellConfig', useValue: environment.apiConfig }, // Provide custom value here
      ]
  },

    {
    path: 'project',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'projectApp',
        exposedModule: './Module',
      }).then((m) => m.ProjectModule),
      providers: [
        { provide: 'shellConfig', useValue: environment.apiConfig }, // Provide custom value here
      ]
  },

    {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'analyticsApp',
        exposedModule: './Module',
      }).then((m) => m.AnalyticsModule),
      providers: [
        { provide: 'shellConfig', useValue: environment.apiConfig }, // Provide custom value here
      ]
  },

  {
    path: 'flights',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'mfe1',
        exposedModule: './Module',
      }).then((m) => m.FlightsModule),
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry:
        'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },

  {
    path: '**',
    component: NotAuthorizedComponent,
  },

  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];
