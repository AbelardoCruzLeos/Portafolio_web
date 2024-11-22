import { CommonModule } from '@angular/common';
import { Component, OnChanges, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, SecurityContext } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';  // Para SafeResourceUrl

import * as pdfjsLib from 'pdfjs-dist';

// Establece el workerSrc
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

@Component({
  standalone: true,
  selector: 'app-crpdf-modal',
  templateUrl: './crpdf-modal.component.html',
  styleUrls: ['./crpdf-modal.component.scss'],
  imports: [
    CommonModule
  ]
})
export class CRPdfModalComponent implements OnChanges, AfterViewInit {
  @Input() pdfUrl: SafeResourceUrl | null = null;
  @Output() cerrarModal = new EventEmitter<void>();

  pdf: any = null;
  loading: boolean = true;
  pageNum: number = 1;

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.pdfUrl) {
      const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.pdfUrl) || '';
      if (url) {
        this.cargarPDF(url);
      } else {
        console.error('URL no válida');
        this.loading = false;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.pdfUrl) {
      const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.pdfUrl) || '';
      if (url) {
        this.cargarPDF(url);
      } else {
        console.error('URL no válida');
        this.loading = false;
      }
    }
  }

  cargarPDF(url: string): void {
    if (!url) {
      console.error("No se proporcionó un URL válido para el PDF");
      this.loading = false;
      return;
    }

    const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    context?.clearRect(0, 0, canvas.width, canvas.height);

    this.loading = true;

    pdfjsLib.getDocument(url).promise.then((pdfDoc) => {
      this.pdf = pdfDoc;
      this.loading = false;
      this.renderizarPagina(this.pageNum);
    }).catch((error) => {
      console.error("Error al cargar el PDF", error);
      this.loading = false;
    });
  }

  renderizarPagina(pageNum: number): void {
    if (!this.pdf) return;

    this.pdf.getPage(pageNum).then((page: any) => {
      const scale = 1.5;
      const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: context,
        viewport: viewport
      }).promise.then(() => {
        this.cdr.detectChanges();
      });
    });
  }

  cerrar(): void {
    this.pdf = null;
    this.cerrarModal.emit();
  }
}
