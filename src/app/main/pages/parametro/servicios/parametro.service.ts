import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TitParametro } from '../../compartidos/modelos/TitParametro';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient) { }
  eliminarParametroPorId(codParametro: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_titulacion}/private/eliminarParametroPorId/${codParametro}`);
  }
  listarParametroActivo(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarParametroActivo`);
  }
  buscarParametroPorId(codParametro: number) {
    return this.http.get<any>(`${environment.url_titulacion}/private/buscarParametroPorCodigo/${codParametro}`);
  }
  guardarParametro(parametro) {
    return this.http.post<TitParametro>(`${environment.url_titulacion}/private/guardarParametro`, parametro);
  }
}
