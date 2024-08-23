import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactameComponent } from './pages/contactame/contactame.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'juegos', component: GamesComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contactame', component: ContactameComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
