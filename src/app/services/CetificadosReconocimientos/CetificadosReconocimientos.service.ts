import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificadosReconocimientosService {
  private readonly baseUrl = 'http://localhost:3000/certificados'; // Cambia esta URL por la de tu API

  constructor(private httpClient: HttpClient) {}

  // Obtener todos los certificados
  getAll<T>(options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl, options);
  }

  // Obtener un certificado por ID
  getById<T>(id: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`, options);
  }

  // Crear un nuevo certificado (Subir archivos y datos adicionales)
  create<T>(formData: FormData, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/handle-files`, formData, options);
  }

  // Actualizar un certificado por ID
  update<T>(id: string, data: Partial<any>, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.patch<T>(`${this.baseUrl}/${id}`, data, options);
  }

  // Eliminar un certificado por ID
  delete<T>(id: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}/${id}`, options);
  }
}
