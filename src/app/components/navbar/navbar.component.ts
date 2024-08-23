import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  dropdownOpen = false;
  currentLang: string;

  languages = [
    { code: 'en', label: 'NAVBAR.ENGLISH' },
    { code: 'es', label: 'NAVBAR.SPANISH' },
    { code: 'de', label: 'NAVBAR.GERMAN' },
    { code: 'it', label: 'NAVBAR.ITALIAN' },
    { code: 'zh', label: 'NAVBAR.CHINESE' }
  ];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    this.dropdownOpen = false;
    // Forzar la actualización
    this.translate.reloadLang(language).subscribe(() => {
      this.translate.use(language);
      this.dropdownOpen = false;  // Cerrar el dropdown después de cambiar el idioma
    });
  }
}
