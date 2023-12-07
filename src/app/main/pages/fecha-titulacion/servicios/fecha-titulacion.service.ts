import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TitFechaTitulacion } from '../../compartidos/modelos/TitFechaTitulacion';

@Injectable({
  providedIn: 'root'
})
export class FechaTitulacionService {

  constructor(private http: HttpClient) { }

  // Listar Fecha Titulacion Activo
  listarFechaTitulacionActivo(): Observable<TitFechaTitulacion[]> {
    return this.http.get<TitFechaTitulacion[]>(`${environment.url_titulacion}/private/listarFechaTitulacionActivo`);
  }
  // Guardar Fecha Titulación
  guardarFechaTitulacion(fechaTitulacion) {
    return this.http.post<TitFechaTitulacion>(`${environment.url_titulacion}/private/guardarFechaTitulacion`, fechaTitulacion);
  }
  // Eliminar Fecha Titulación
  eliminarFechaTitulacionPorId(codigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_titulacion}/private/eliminarFechaTitulacionPorId/${codigo}`);
  }

}
