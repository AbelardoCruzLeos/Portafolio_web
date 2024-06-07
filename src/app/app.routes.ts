import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el componente Home
  { path: 'games', component: GamesComponent }, // Ruta para el componente Home
  { path: '**', component: HomeComponent }, // Ruta para el componente Home
];
