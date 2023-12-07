import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TitModeloCalificacion } from '../../compartidos/modelos/TitModeloCalificacion';

@Injectable({
  providedIn: 'root'
})
export class ModeloCalificacionService {

  constructor(private http: HttpClient) { }

  // Eliminar Modelo Calificación  
  eliminarModeloCalificacionPorId(codigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_titulacion}/private/eliminarModeloCalificacionPorId/${codigo}`);
  }
  // Listar Modelo Calificación
  listarModeloCalificacionPorRegAniLec(reanleCodigo: number) {
    return this.http.get<TitModeloCalificacion[]>(`${environment.url_titulacion}/private/listarModeloCalificacionPorRegAniLec/${reanleCodigo}`);
  }
  // Guardar Modelo Calificación
  guardarModeloCalificacion(modeloCalificacion) {
    return this.http.post<TitModeloCalificacion>(`${environment.url_titulacion}/private/guardarModeloCalificacion`, modeloCalificacion);
  }
}
