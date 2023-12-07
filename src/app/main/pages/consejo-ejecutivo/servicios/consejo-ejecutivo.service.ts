import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CatAnioLectivo } from '../../compartidos/modelos/CatAnioLectivo';
import { TitConsejoEjecutivo } from '../../compartidos/modelos/TitConsejoEjecutivo';
import { UsuarioCedula } from '../../compartidos/modelos/usuarioCedula';

@Injectable({
  providedIn: 'root'
})
export class ConsejoEjecutivoService {

  constructor(private http: HttpClient) { }
  /*SERVICIOS EXTERNOS*/
  buscarPorCedula(objeto: any): Observable<UsuarioCedula> {
    return this.http.post<UsuarioCedula>(`${environment.url_servicioExterno}/public/buscarPorCedula`, objeto);
  }
  eliminarConsejoEjecutivoPorId(codigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_titulacion}/private/eliminarConsejoEjecPorId/${codigo}`);
  }
  listarConsejoEjecPorInstitucionYAnioLectivo(idInstitucion: number, idAniolectivo: number) {
    return this.http.get<CatAnioLectivo[]>(`${environment.url_titulacion}/private/listarConsejosEjecPorInstitucionYAnioLectivo/${idInstitucion}/${idAniolectivo}`);
  }
  listarCargos(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarTodosCargo`);
  }
  buscarCargoPorId(idCargo: number) {
    return this.http.get<any>(`${environment.url_titulacion}/private/buscarCargoPorCodigo/${idCargo}`);
  }
  guardarConsejoEjecutivo(consejoEjecutivo) {
    return this.http.post<TitConsejoEjecutivo>(`${environment.url_titulacion}/private/guardarConsejoEjec`, consejoEjecutivo);
  }

}
