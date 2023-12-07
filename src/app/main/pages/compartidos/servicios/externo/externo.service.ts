import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CatAnioLectivo } from '../../modelos/CatAnioLectivo';
import { CatEspecialidad } from '../../modelos/CatEspecialidad';
import { CatGrado } from '../../modelos/CatGrado';
import { CatJornada } from '../../modelos/CatJornada';
import { CatModalidad } from '../../modelos/CatModalidad';
import { CatRegimen } from '../../modelos/CatRegimen';
import { CatTipoEducacion } from '../../modelos/CatTipoEducacion';
import { Institucion } from '../../modelos/Institucion';
import { OfeParalelo } from '../../modelos/OfeParalelo';
import { UsuarioCedula } from '../../modelos/usuarioCedula';

@Injectable({
  providedIn: 'root'
})
export class ExternoService {
  constructor(private http: HttpClient) { }
  /*SERVICIOS EXTERNOS*/
  // Datos Usuario logueado en el sistema
  buscarPorCedula(objeto: any): Observable<UsuarioCedula> {
    return this.http.post<UsuarioCedula>(`${environment.url_servicioExterno}/public/buscarPorCedula`, objeto);
  }
  // Listar año lectivo 
  listarAnioLectivo(): Observable<CatAnioLectivo[]> {
    return this.http.get<CatAnioLectivo[]>(`${environment.url_catalogo}/private/listaPorAnioLectivo`);
  }
  // Datos Institución, relacionada con el usuario logueado
  buscarInstitucionEducacivaPorAmie(amie: string): Observable<Institucion> {
    return this.http.get<Institucion>(`${environment.url_catalogo}/private/buscarInstitucionEducativaPorAmie/${amie}`);
  }
  // Datos Institución relacionada con el Régimen
  listarInstitucionRegimenPorCodigoInstitucion(insCodigo: number): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${environment.url_giee}/private/listarInstitucionRegimenPorCodigoInstitucion/${insCodigo}`);
  }
  // Listar Tipo Educacion
  listarTipoEducacion(): Observable<CatTipoEducacion[]> {
    return this.http.get<CatTipoEducacion[]>(`${environment.url_catalogo}/private/listarTiposEducacion`);
  }
  // Listar Grado
  listarCatalogoGrados(): Observable<CatGrado[]> {
    return this.http.get<CatGrado[]>(`${environment.url_catalogo}/private/listarCatalogoGrados`);
  }  
  // Obtener Grado
  buscarCatalogoGradosPorCodigo(graCodigo: number) {
    return this.http.get<any>(`${environment.url_catalogo}/private/buscarCatalogoGradosPorCodigo/${graCodigo}`);
  }
  // Obtener Nivel
  buscarNivelPorCodigo(nivCodigo: number) {
    return this.http.get<any>(`${environment.url_catalogo}/private/buscarNivelPorCodigo/${nivCodigo}`);
  }
  // Obtener Tipo Nivel
  buscarCatalogoTipoNivelPorCodigo(tipnivCodigo: number) {
    return this.http.get<any>(`${environment.url_catalogo}/private/buscarCatalogoTipoNivelPorCodigo/${tipnivCodigo}`);
  }
  // Obtener Tipo Educacion
  buscarTipoEducacionPorCodigo(tipeduCodigo: number) {
    return this.http.get<any>(`${environment.url_catalogo}/private/buscarTipoEducacionPorCodigo/${tipeduCodigo}`);
  }
  // Obtener Año Lectivo
  buscarAnioLectivoPorCodigo(anilecCodigo: number) {
    return this.http.get<any>(`${environment.url_catalogo}/private/buscarAnioLectivoPorCodigo/${anilecCodigo}`);
  }
  // Obtener RegAniLec por codigo reanleCodigo
  buscarRegimenAnioLectivoPorCodigo(reanleCodigo: number) {
    return this.http.get<any>(`${environment.url_catalogo}/private/buscarRegimenAnioLectivoPorCodigo/${reanleCodigo}`);
  }
  // Listar modalidad
  listarModalidad(): Observable<CatModalidad[]> {
    return this.http.get<CatModalidad[]>(`${environment.url_catalogo}/private/listarModalidades`);
  }
  // Listar especialidad 
  listarEspecialidad(): Observable<CatEspecialidad[]> {
    return this.http.get<CatEspecialidad[]>(`${environment.url_catalogo}/private/listarCatalogoEspecialidades`);
  }
  // Listar grados 
  listarGrado(): Observable<CatGrado[]> {
    return this.http.get<CatGrado[]>(`${environment.url_catalogo}/private/listarCatalogoGrados`);
  }
  // Listar regimen 
  listarRegimen(): Observable<CatRegimen[]> {
    return this.http.get<CatRegimen[]>(`${environment.url_catalogo}/private/listarRegimenes`);
  }
  // Listar Jornadas 
  listarJornada(): Observable<CatJornada[]> {
    return this.http.get<CatJornada[]>(`${environment.url_catalogo}/private/listarJornadas`);
  }
  // Listar Jornadas 
  listarParalelos(): Observable<OfeParalelo[]> {
    return this.http.get<OfeParalelo[]>(`${environment.url_oferta}/private/listarParalelo`);
  }
  // Listar Regimen Anio Lectivo
  listarRegimenAnioLectivoActivo(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/listarRegimenAnioLectivo`);
  }
  // Listar Servicio Educativo Por Registro Anio Lectivo
  listarServicioEducativosPorRegistroAnioLectivo(reanleCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/listarServicioEducativosPorRegistroAnioLectivo/${reanleCodigo}`);
  }
  
  // Listar Servicios Educativos
  listarServicioEducativos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/listarServicioEducativos`);
  }

  // Listar Curso (Oferta-Curso/OFE_CURSO)
  listarOfertaCurso(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_oferta}/private/listaCurso`);
  }
  // Listar CursoParalelo (Oferta-CursoParalelo/OFE_CURPAR)
  listarOfertaCursoParalelo(curCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_oferta}/private/listarParaleloOrdinarioPorCurso/${curCodigo}`);
  }
  // Listar Curso (Oferta-Curso/OFE_CURSO) Por Código de Institución
  listaCursoPorInsestCodigo(insestCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_oferta}/private/listaCursoPorInsestCodigo/${insestCodigo}`);
  }
  // Listar CursoParalelo (Oferta-CursoParalelo/OFE_CURPAR)
  buscarParaleloPorCodigo(parCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_oferta}/private/buscarParaleloPorCodigo/${parCodigo}`);
  }
  // Busar regimen por código
  buscarRegimenPorCodigo(regCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/buscarRegimenPorCodigo/${regCodigo}`);
  }
  // Busar jornada por código
  buscarJornadaPorCodigo(jorCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/buscarJornadaPorCodigo/${jorCodigo}`);
  }
  // Busar modalidad por código
  buscarModalidadPorCodigo(modCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/buscaroModalidadPorCodigo/${modCodigo}`);
  }
  // Busar especialidad por código
  buscarEspecialidadPorCodigo(espCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_catalogo}/private/buscarCatalogoEspecialidadPorCodigo/${espCodigo}`);
  }
  //BUSCAR INSTITUCIÓN POR AMIE ESQUEMA INSTITUCIONESAPP
  buscarInstitucionPorAmie(amie: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_giee}/private/buscarInstitucionPorAmie/${amie}`);
  }
  //buscar establecimientos por codigo de institucion
  buscarEstablecimientosPorCodInstitucion(codInstitucion: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_giee}/private/listarEstablecimientosPorInstitucion/${codInstitucion}`);
  }
  //listar oferta educativa por lista de estableciemineos
  listarOfertaPorListaEstablecimientos(listaEstablecimientos: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_oferta}/private/listarCursoPorListaEstablecimiento/${listaEstablecimientos}`);
  }
  // Listar estudiates matriculados 
  listarEstudiantesMatriculadosPorCurPar(curparCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_matricula}/private/listarMatriculaOrdinariaEstudiantePorCurparCodigo/${curparCodigo}`);
  }
  // Listar modelo calificación
  listarModeloCalificacionPor(reanleCodigo: number,tipeduCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarModeloCalificacionPorRegAniLecYTipoEducacion/${reanleCodigo}/${tipeduCodigo}`);
  }
  // Listar modelo promedio 
  listarModeloPromedioPorRegAniLecYTipoEducacion(reanleCodigo: number, tipeduCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarModeloPromedioPorRegAniLecYTipoEducacion/${reanleCodigo}/${tipeduCodigo}`);
  }
  // Listar modelo calificación 
  listarModeloCalificacionPorRegAniLecYTipoEducacion(reanleCodigo: number, tipeduCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarModeloCalificacionPorRegAniLecYTipoEducacion/${reanleCodigo}/${tipeduCodigo}`);
  }
  // Listar calificación por estudiante
  listarCalificacionPorEstudiante(estCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarCalificacionPorEstudiante/${estCodigo}`);
  }
  // Listar promedio por estudiante
  listarPromedioPorEstudianteYRegAniLec(estCodigo: number, reanleCodigo: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarPromedioPorEstudianteYRegAniLec/${estCodigo}/${reanleCodigo}`);
  }
  // Listar promedio por estudiante y nemonico 
  listarPromedioPorEstudianteYNemonico(estCodigo: number, mprNemonico: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_titulacion}/private/listarPromedioPorEstudianteYNemonico/${estCodigo}/${mprNemonico}`);
  }

}
