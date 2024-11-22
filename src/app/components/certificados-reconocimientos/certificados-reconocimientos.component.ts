import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CertificadosReconocimientosService } from '../../services/CetificadosReconocimientos/CetificadosReconocimientos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-certificados-reconocimientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificados-reconocimientos.component.html',
  styleUrls: ['./certificados-reconocimientos.component.scss'], // Corregido "styleUrls"
})
export class CertificadosReconocimientosComponent implements OnInit {
  certificados: { nombre: string; imageUrl: string; pdfUrl: SafeResourceUrl }[] = [];
  isLoading: boolean = false; // Indicador de carga
  errorMessage: string | null = null; // Para manejar errores

  constructor(
    private certificadosService: CertificadosReconocimientosService,
    private sanitizer: DomSanitizer // Para sanitizar las URLs
  ) {}

  ngOnInit(): void {
    this.cargarCertificados(); // Cargar certificados al iniciar
  }

  // Función para cargar certificados desde la API
  cargarCertificados(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.certificadosService.getAll<any[]>()
      .subscribe({
        next: (data: any[]) => {
          this.certificados = data.map((certificado) => ({
            nombre: certificado.nombre,
            imageUrl: certificado.imageUrl,
            pdfUrl: this.sanitizer.bypassSecurityTrustResourceUrl(certificado.pdfUrl),
          }));
          this.isLoading = false;
        },
        error: (err: any) => {
          this.errorMessage = 'Error al cargar los certificados.';
          console.error(err);
          this.isLoading = false;
        },
      });
      console.log(this.certificados);
      
  }
}
