import { Component, OnInit } from '@angular/core';
import { CertificadosReconocimientosService } from '../../services/CetificadosReconocimientos/CetificadosReconocimientos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CRPdfModalComponent } from './crpdf-modal/crpdf-modal.component';

@Component({
  selector: 'app-certificados-reconocimientos',
  standalone: true,
  imports: [CommonModule, CRPdfModalComponent],
  templateUrl: './certificados-reconocimientos.component.html',
  styleUrls: ['./certificados-reconocimientos.component.scss'],
})
export class CertificadosReconocimientosComponent implements OnInit {
  certificados: { nombre: string; imageUrl: string; pdfUrl: SafeResourceUrl }[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  mostrarModal: boolean = false;
  pdfUrlSeleccionado: SafeResourceUrl | null = null;

  constructor(
    private certificadosService: CertificadosReconocimientosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargarCertificados();
  }

  cargarCertificados(): void {
    this.certificadosService.getAll().subscribe({
      next: (data: any[]) => {
        this.certificados = data.map(certificado => ({
          ...certificado,
          pdfUrl: this.sanitizer.bypassSecurityTrustResourceUrl(certificado.pdfUrl)
        }));
      },
      error: (err: any) => {
        console.error('Error al cargar los certificados:', err);
        this.errorMessage = 'Error al cargar los certificados';
      },
    });
  }

  abrirModal(pdfUrl: SafeResourceUrl): void {
    this.pdfUrlSeleccionado = pdfUrl; // Asignar la URL del PDF seleccionado
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pdfUrlSeleccionado = null; // Limpiar la URL del PDF al cerrar el modal
  }
}
