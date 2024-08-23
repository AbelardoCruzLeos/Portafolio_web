import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ViboraComponent } from './vivora/vibora.component'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ViboraComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  games = [
    {
      name: 'La Vibora',
      description: 'Un clásico juego de la serpiente donde controlas a una serpiente que crece al comer.',
      image: 'path/to/vibora-image.jpg',
      link: ''
    },
    {
      name: 'Juego 2',
      description: 'Descripción del segundo juego.',
      image: 'path/to/game2-image.jpg',
      link: ''
    },
    {
      name: 'Juego 3',
      description: 'Descripción del tercer juego.',
      image: 'path/to/game3-image.jpg',
      link: ''
    }
  ];

  currentGame: any = null;

  openGame(game: any) {
    if (game.name === 'La Vibora') {
      this.currentGame = game;
    } else {
      window.open(game.link, '_blank');
    }
  }

  closeModal() {
    this.currentGame = null;
  }
}
