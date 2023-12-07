import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TitModeloPromedio } from '../../compartidos/modelos/TitModeloPromedio';

@Injectable({
  providedIn: 'root'
})
export class ModeloPromedioService {

  constructor(private http: HttpClient) { }

  // Eliminar Modelo Calificación  
  eliminarModeloPromedioPorId(codigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_titulacion}/private/eliminarModeloPromedioPorId/${codigo}`);
  }
  // Listar Modelo Promedio
  listarModeloPromedioPorRegAniLec(reanleCodigo: number) {
    return this.http.get<TitModeloPromedio[]>(`${environment.url_titulacion}/private/listarModeloPromedioPorRegAniLec/${reanleCodigo}`);
  }
  // Guardar Modelo Promedio
  guardarModeloPromedio(modeloPromedio) {
    return this.http.post<TitModeloPromedio>(`${environment.url_titulacion}/private/guardarModeloPromedio`, modeloPromedio);
  }
}
