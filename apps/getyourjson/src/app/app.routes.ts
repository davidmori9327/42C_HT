import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome').then(m => m.Welcome)
  },
  {
    path: 'files',
    loadComponent: () => import('./file-list').then(m => m.FileList)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
