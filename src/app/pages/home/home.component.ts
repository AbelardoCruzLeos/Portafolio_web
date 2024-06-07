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
  currentPage: number = 1;
  reposPerPage: number = 9;
  pagesArray: number[] = [];
  TotalRepos: number = 0;
  TotalPages: number = 0;

  // Mapa de lenguajes a íconos y colores
  lenguajeInfo: any = {
    JavaScript: {
      icon: 'https://img.icons8.com/color/48/000000/javascript.png',
      color: '#f7df1e',
    },
    TypeScript: {
      icon: 'https://img.icons8.com/color/48/000000/typescript.png',
      color: '#3178c6',
    },
    Python: {
      icon: 'https://img.icons8.com/color/48/000000/python.png',
      color: '#3572A5',
    },
    // Agrega más lenguajes aquí según sea necesario
  };

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
          console.log(this.proyectos);
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
        console.log(this.repos.length + 'Repositorios');
        this.TotalRepos = this.repos.length;
        console.log(this.TotalRepos + 'Total de repositorios');
        this.TotalPages = Math.ceil(this.TotalRepos / this.reposPerPage);
        console.log(this.TotalPages + 'Total de paginas');

        for (let i = 0; i < repos.length; i += this.reposPerPage) {
          this.repos.push(repos.slice(i, i + this.reposPerPage));
        }
      },
      (error) => {
        console.error('Error al obtener repositorios:', error);
      }
    );
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
    this.cargarRepositorios();
  }

  getPagesArray(): number[] {
    const totalPages = Math.ceil(this.TotalRepos / 9);
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1);
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
      // Reemplaza 'URL_DEL_ICONO_C_PLUS_PLUS' con la URL real del icono de C++
      default:
        return 'URL_DEL_ICONO_POR_DEFECTO'; // URL de un icono por defecto si el lenguaje no tiene un icono específico
    }
  }
}
