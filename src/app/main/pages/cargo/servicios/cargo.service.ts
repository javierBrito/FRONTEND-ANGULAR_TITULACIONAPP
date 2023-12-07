import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TitCargo } from '../../compartidos/modelos/TitCargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  constructor(private http: HttpClient) { }
  eliminarCargoPorId(codigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_titulacion}/private/eliminarCargoPorId/${codigo}`);
  }
  listarCargoActivo(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarCargoActivo`);
  }
  buscarCargoPorId(idCargo: number) {
    return this.http.get<any>(`${environment.url_titulacion}/private/buscarCargoPorCodigo/${idCargo}`);

  }
  guardarCargo(cargo) {
    return this.http.post<TitCargo>(`${environment.url_titulacion}/private/guardarCargo`, cargo);
  }
}
