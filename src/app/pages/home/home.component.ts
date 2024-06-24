import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  seccionActiva: string = 'proyectos';
  proyectos: any[] = [];
  repos: any[] = [];
  reposPorPage: any[][] = []; // Cambiado a matriz para paginación
  currentPage: number = 1;
  reposPerPage: number = 9;
  pagesArray: number[] = [];
  TotalRepos: number = 0;
  TotalPages: number = 0;

  constructor(
    private proyectosService: ProyectosService,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarRepositorios();
  }

  cargarProyectos(): void {
    this.proyectosService
      .getProyects('http://localhost:3000/proyectos', { page: 0, perPage: 10 })
      .subscribe(
        (proyectos: any) => {
          this.proyectos = proyectos.map((proyecto: any) => ({
            Nombre: proyecto.Nombre,
            Image_Url: proyecto.Image_Url,
            Page_Url: proyecto.Page_Url,
            Participantes: proyecto.Participantes,
            Lenguajes: proyecto.Lenguajes,
          }));
        },
        (error) => {
          console.error('Error al obtener proyectos:', error);
        }
      );
  }

  cargarRepositorios(): void {
    this.githubService.getAllRepos().subscribe(
      (repos) => {
        this.repos = repos;
        this.TotalRepos = repos.length;
        this.TotalPages = Math.ceil(this.TotalRepos / this.reposPerPage);
        this.pagesArray = this.getPagesArray();

        this.reposPorPage = this.divideArrayInChunks(repos, this.reposPerPage);
      }, 
      (error) => {
        console.error('Error al obtener repositorios:', error);
      }
    );
  }

  divideArrayInChunks(array: any[], chunkSize: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;

    // Recargar los datos si la sección activa es 'proyectos'
    if (seccion === 'proyectos' && this.proyectos.length === 0) {
      this.cargarProyectos();
    }
    // Recargar los datos si la sección activa es 'repositorios'
    if (seccion === 'repositorios' && this.repos.length === 0) {
      this.cargarRepositorios();
    }
  }

  onPageChange(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.TotalPages) {
      return; // Evitar cargar páginas inválidas
    }
    this.currentPage = pageNumber;
  }

  getPagesArray(): number[] {
    return Array(this.TotalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  getLanguageIconUrl(language: string): string {
    switch (language.toLowerCase()) {
      case 'c#': 
        return 'https://cdn3d.iconscout.com/3d/free/thumb/free-c-sharp-9294854-7577997.png?f=webp';
      case 'llvm':
        return 'https://e7.pngegg.com/pngimages/528/38/png-clipart-clang-llvm-gnu-compiler-collection-c-llvm-c-google-chrome.png';
      case 'javascript':
        return 'https://cdn3d.iconscout.com/3d/free/thumb/free-javascript-9294848-7577991.png?f=webp';
      case 'typescript':
        return 'https://cdn3d.iconscout.com/3d/free/thumb/free-typescript-9294849-7577992.png';
      default:
        return 'URL_DEL_ICONO_POR_DEFECTO'; // URL de un icono por defecto si el lenguaje no tiene un icono específico
    }
  }
}
