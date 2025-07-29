import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'juegos',
    loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent)
  },
  {
    path: 'acercade',
    loadComponent: () => import('./pages/acercade/acercade.component').then(m => m.AcercadeComponent)
  },
  {
    path: 'contactame',
    loadComponent: () => import('./pages/contactame/contactame.component').then(m => m.ContactameComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
