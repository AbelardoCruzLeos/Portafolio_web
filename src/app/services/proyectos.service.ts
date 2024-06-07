import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Proyectos } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(
    private apiService: ApiService
  ) { }

  getProyects = (url: string, params: PaginationParams): Observable<Proyectos> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }
}
