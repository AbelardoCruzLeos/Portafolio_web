import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Protafolio-Web';

  constructor(private translate: TranslateService) {
    const browserLang = this.translate.getBrowserLang();
    const langToUse = browserLang?.match(/en|es/) ? browserLang : 'es';
    this.translate.setDefaultLang('en');
    this.translate.use(langToUse); // Usa 'es' si browserLang es undefined o no coincide
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    // Forzar la actualización
    this.translate.reloadLang(lang).subscribe(() => {
      this.translate.use(lang);
    });
  }
}
