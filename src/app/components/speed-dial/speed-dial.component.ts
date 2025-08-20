import { Component } from '@angular/core';

@Component({
  selector: 'app-speed-dial',
  standalone: true,
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.css']
})
export class SpeedDialComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
