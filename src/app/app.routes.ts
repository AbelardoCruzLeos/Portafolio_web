import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el componente Home
  { path: 'juegos', component: GamesComponent }, // Ruta para el componente games
  { path: 'acercade', component: AcercadeComponent }, // Ruta para el componente acercade
  { path: '**', component: HomeComponent }, // Ruta para el componente Home
];
