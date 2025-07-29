import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CertificadosReconocimientosService {
  private readonly baseUrl = 'https://api.abelardocruzleos.dev/certificados'; // URL de la API

  constructor(private httpClient: HttpClient) {}

  /**
   * Obtener todos los certificados
   * @param options Opciones adicionales como cabeceras
   * @returns Observable con la lista de certificados transformada
   */
  getAll(options?: { headers?: HttpHeaders }): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl, options).pipe(
      map((data) =>
        data.map((item) => ({
          id: item._id || '',
          nombre: item.tag || 'Sin nombre', // Usa 'Sin nombre' si no hay tag
          imageUrl: item.images?.[0]?.url || '', // Toma la primera imagen si existe
          pdfUrl: item.PDF_Url || '', // URL del PDF
        }))
      )
    );
  }
  

  /**
   * Obtener un certificado por su ID
   * @param id ID del certificado
   * @param options Opciones adicionales como cabeceras
   * @returns Observable con el certificado
   */
  getById<T>(id: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`, options);
  }

  /**
   * Crear un nuevo certificado
   * @param formData FormData con los datos y archivos a enviar
   * @param options Opciones adicionales como cabeceras
   * @returns Observable con la respuesta del servidor
   */
  create<T>(formData: FormData, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/handle-files`, formData, options);
  }

  /**
   * Actualizar un certificado existente
   * @param id ID del certificado
   * @param data Datos a actualizar
   * @param options Opciones adicionales como cabeceras
   * @returns Observable con la respuesta del servidor
   */
  update<T>(id: string, data: Partial<any>, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.patch<T>(`${this.baseUrl}/${id}`, data, options);
  }

  /**
   * Eliminar un certificado por su ID
   * @param id ID del certificado
   * @param options Opciones adicionales como cabeceras
   * @returns Observable con la respuesta del servidor
   */
  delete<T>(id: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}/${id}`, options);
  }
}
