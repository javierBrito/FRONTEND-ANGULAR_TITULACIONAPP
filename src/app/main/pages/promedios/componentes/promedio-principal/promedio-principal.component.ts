import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginAplicacion } from 'app/auth/models/loginAplicacion';
import { Sede } from 'app/auth/models/sede';
import { CatAnioLectivo } from 'app/main/pages/compartidos/modelos/CatAnioLectivo';
import { CatEspecialidad } from 'app/main/pages/compartidos/modelos/CatEspecialidad';
import { CatGrado } from 'app/main/pages/compartidos/modelos/CatGrado';
import { CatJornada } from 'app/main/pages/compartidos/modelos/CatJornada';
import { CatModalidad } from 'app/main/pages/compartidos/modelos/CatModalidad';
import { CatNivel } from 'app/main/pages/compartidos/modelos/CatNivel';
import { CatRegimen } from 'app/main/pages/compartidos/modelos/CatRegimen';
import { CatRegimenAnioLectivo } from 'app/main/pages/compartidos/modelos/CatRegimenAnioLectivo';
import { CatTipoEducacion } from 'app/main/pages/compartidos/modelos/CatTipoEducacion';
import { CatTipoNivel } from 'app/main/pages/compartidos/modelos/CatTipoNivel';
import { Institucion } from 'app/main/pages/compartidos/modelos/Institucion';
import { InstitucionRegimen } from 'app/main/pages/compartidos/modelos/InstitucionRegimen';
import { OfeParalelo } from 'app/main/pages/compartidos/modelos/OfeParalelo';
import { OfertaCurso } from 'app/main/pages/compartidos/modelos/OfertaCurso';
import { OfertaCursoParalelo } from 'app/main/pages/compartidos/modelos/OfertaCursoParalelo';
import { TitConsejoEjecutivo } from 'app/main/pages/compartidos/modelos/TitConsejoEjecutivo';
import { TitModeloPromedio } from 'app/main/pages/compartidos/modelos/TitModeloPromedio';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import { ConsejoEjecutivoService } from 'app/main/pages/consejo-ejecutivo/servicios/consejo-ejecutivo.service';
import Swal from 'sweetalert2';
import { Promedio } from '../../modelos/Promedio';
import { PromedioAux } from '../../modelos/PromedioAux';
import { PromedioService } from '../../servicios/promedio.service';

@Component({
  selector: 'app-promedio-principal',
  templateUrl: './promedio-principal.component.html',
  styleUrls: ['./promedio-principal.component.scss']
})
export class PromedioPrincipalComponent implements OnInit {

  /*MODALES*/
  @ViewChild("modal_confirm_delete", { static: false }) modal_confirm_delete: TemplateRef<any>;
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;

  /*VARIABLES*/
  public institucion: Institucion;
  public anioLectivoSeleccionado: CatAnioLectivo;
  public regimenAnioLectivo: CatRegimenAnioLectivo;
  public regimenAnioLectivoSeleccionado: CatRegimenAnioLectivo;
  public regimenSeleccionado: CatRegimen;
  public regimen: CatRegimen;
  public jornada: CatJornada;
  public modalidad: CatModalidad;
  public especialidad: CatEspecialidad;
  public paralelo: OfeParalelo;
  public catRegimenAnioLectivo: CatRegimenAnioLectivo;
  public catGrado: CatGrado;
  public catNivel: CatNivel;
  public catTipoNivel: CatTipoNivel;
  public idInput = '';
  public indexSelec = '';
  public datosEditar: any;
  public activarInput = false;
  public reanleCodigo: number;
  public jorCodigo: number;
  public espCodigo: number;
  public modCodigo: number;
  public parCodigo: number;
  public codInstitucionEducativa: number;

  public jorNombre: string;
  public modNombre: string;
  public espDescripcion: string;
  public parDescripcion: string;
  public nivDescripcion: string;
  public continuarGuardarPendiente: boolean;

  /*LISTAS*/
  public listaAnioLectivo: CatAnioLectivo[] = [];
  public listaRegimenAnioLectivo: CatRegimenAnioLectivo[] = [];
  public listaConsejosEducativos: TitConsejoEjecutivo[] = [];
  public listaModalidad: CatModalidad[] = [];
  public listaTipoEducacion: CatTipoEducacion[] = [];
  public listaJornada: CatJornada[] = [];
  public listaRegimen: CatRegimen[] = [];
  public listaEspecialidad: CatEspecialidad[] = [];
  public listaGrado: CatGrado[] = [];
  public listaParalelo: OfeParalelo[] = [];
  public listaNivel: CatNivel[] = [];
  public listaTipoNivel: CatTipoNivel[] = [];

  public listaPeriodoRegAniLec: any[] = [];
  public listaCodigosEstablecimientos: any[] = [];
  public listaPeriodoRegAniLecAux: any[] = [];
  public listaOfertaCurso: OfertaCurso[] = [];
  public listaOfertaCursoPresentacion: any[] = [];
  public listaEstudiantePresentacion: any[] = [];
  public listaOfertaCursoPresentacionAux: any[] = [];
  public listaOfertaCursoJor: OfertaCurso[] = [];
  public listaOfertaCursoMod: OfertaCurso[] = [];
  public listaOfertaCursoEsp: OfertaCurso[] = [];
  public listaOfertaCursoPar: OfertaCurso[] = [];
  public listaOfertaCursoParalelo: OfertaCursoParalelo[] = [];
  public listaInstitucionRegimen: InstitucionRegimen[] = [];
  public listaInstitucionRegimenAux: InstitucionRegimen[] = [];
  public listaModeloPromedio: TitModeloPromedio[] = [];

  /*TABs*/
  public selectedTab: number;

  /*OBJETOS*/
  private currentUser: LoginAplicacion;
  public sede: Sede;
  public ofertaSeleccionada: any;
  public estudiante: any;
  /*FORMULARIOS*/
  public formPromedio: FormGroup;

  /*DETAIL*/
  public showDetail: boolean;

  /*PAGINACION*/
  public page: number;
  public pageEstudiantes: number;
  public pageNocturna: number;
  public itemsRegistros: number;

  /*OBJETOS*/
  public consejoEjecutivoSeleccionado: TitConsejoEjecutivo;

  /*CONSTRUCTOR*/
  constructor(
    /*Servicios*/
    private readonly consejoEjecutivoService: ConsejoEjecutivoService,
    private readonly mensajeService: MensajeService,
    private modalService: NgbModal,
    private externoService: ExternoService,
    private promedioService: PromedioService,
    private formBuilder: FormBuilder,
  ) {
    this.itemsRegistros = 4;
    this.page = 1;
    this.pageEstudiantes = 1;
    this.pageNocturna = 1;
    this.showDetail = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
    this.regimenAnioLectivo = null;
    this.catRegimenAnioLectivo = null;
    this.anioLectivoSeleccionado = null;
    this.regimen = null;
    this.jornada = null;
    this.reanleCodigo = 0;
    this.jorCodigo = 0;
    this.parCodigo = 0;
    this.selectedTab = 0;
    this.codInstitucionEducativa = 0;

    /*CARGAR COMBOS*/
    this.cargarEspecialidad();
    this.cargarJornada();
    this.cargarModalidad();
    this.cargarTipoEducacion();
    this.cargarGrado();
    // Cargar información del Usuario y su contexto
    this.buscarInstitucion();
  }

  ngOnInit() {
    // Configurar los atributos de la página
    this.formPromedio = this.formBuilder.group({
      reanleCodigo: new FormControl('', Validators.required),
      jorCodigo: new FormControl('', Validators.required),
      modCodigo: new FormControl('', Validators.required),
      espCodigo: new FormControl('', Validators.required),
      parCodigo: new FormControl('', Validators.required),
      nivel: new FormControl('', Validators.required),
      tipoNivel: new FormControl('', Validators.required),
    })
  }

  // Obtener los períodos activos
  listarRegimenAnioLectivo() {
    this.externoService.listarRegimenAnioLectivoActivo().subscribe(
      (respuesta) => {
        this.listaPeriodoRegAniLec = respuesta['listado']
        for (const periodo of this.listaPeriodoRegAniLec) {
          this.listaInstitucionRegimenAux = this.listaInstitucionRegimen.filter((ele) => ele.regCodigo == periodo.regCodigo);
          if (this.listaInstitucionRegimenAux.length > 0) {
            this.externoService.buscarRegimenPorCodigo(periodo.regCodigo).subscribe(
              (respuesta) => {
                periodo.CatRegimen = respuesta['objeto']
              }
            )
            this.externoService.buscarAnioLectivoPorCodigo(periodo.anilecCodigo).subscribe(
              (respuesta) => {
                periodo.CatAnioLectivo = respuesta['objeto']
              }
            )
            this.listaPeriodoRegAniLecAux.push(periodo);
          }
        }
        // Ordenar lista por regCodigo
        this.listaPeriodoRegAniLecAux.sort((firstItem, secondItem) => secondItem.reanleCodigo - firstItem.reanleCodigo);
      }
    );
  }

  cargarListaRegimenAnioLectivo() {
    this.externoService.listarRegimenAnioLectivoActivo().subscribe(
      (respuesta) => {
        this.listaRegimenAnioLectivo = respuesta['listado'];
      }
    );
  }

  cargarListaAnioLectivo() {
    this.externoService.listarAnioLectivo().subscribe(
      (respuesta) => {
        this.listaAnioLectivo = respuesta['listado'];
      }
    );
  }

  cargarModalidad() {
    this.externoService.listarModalidad().subscribe(
      (respuesta) => {
        this.listaModalidad = respuesta['listado'];
      }
    );
  }
  cargarTipoEducacion() {
    this.externoService.listarTipoEducacion().subscribe(
      (respuesta) => {
        this.listaTipoEducacion = respuesta['listado'];
      }
    );
  }

  cargarJornada() {
    this.externoService.listarJornada().subscribe(
      (respuesta) => {
        this.listaJornada = respuesta['listado'];
      }
    );
  }

  cargarGrado() {
    this.externoService.listarGrado().subscribe(
      (respuesta) => {
        this.listaGrado = respuesta['listado'];
      }
    );
  }

  cargarEspecialidad() {
    this.externoService.listarEspecialidad().subscribe(
      (respuesta) => {
        this.listaEspecialidad = respuesta;
      }
    );
  }

  cargarRegimen() {
    this.externoService.listarRegimen().subscribe(
      (respuesta) => {
        this.listaRegimen = respuesta['listado'];
      }
    );
  }

  buscarRegimenAnioLectivoPorCodigo() {
    this.externoService.buscarRegimenAnioLectivoPorCodigo(this.reanleCodigo).subscribe(
      (respuesta) => {
        this.catRegimenAnioLectivo = respuesta['objeto']
      }
    )
  }

  async seleccionarOferta() {
    this.reanleCodigo = this.formPromedio.value.reanleCodigo;
    this.listaOfertaCursoPresentacionAux = this.listaOfertaCurso.filter(oferta => oferta.reanleCodigo == this.reanleCodigo && (oferta.graCodigo == 15 || oferta.graCodigo == 18 || oferta.graCodigo == 19))
    this.listaOfertaCursoPresentacion = [];
    this.listaEstudiantePresentacion = [];
    this.ofertaSeleccionada = null;
    for (const registro of this.listaOfertaCursoPresentacionAux) {
      registro.nemonicoModalidad = this.listaModalidad.find(modalidad => modalidad.modCodigo == registro.modCodigo).modNombre
      registro.nemonicoJornada = this.listaJornada.find(jornada => jornada.jorCodigo == registro.jorCodigo).jorNombre
      registro.nemonicoTipoEducacion = this.listaTipoEducacion.find(tipoEducacion => tipoEducacion.tipeduCodigo == registro.tipeduCodigo).tipeduNombre
      registro.nemonicoGrado = this.listaGrado.find(grado => grado.graCodigo == registro.graCodigo).graDescripcion
      registro.nemonicoEspecialidad = this.listaEspecialidad.find(especialidad => especialidad.espCodigo == registro.espCodigo)?.espDescripcion
      await new Promise((resolve, rejects) => {
        this.externoService.listarOfertaCursoParalelo(registro.curCodigo).subscribe({
          next: (respuesta) => {
            for (const paralelo of respuesta['listado']) {
              let objetoParalelo = {
                nemonicoParalelo: paralelo.nombreParalelo,
                parCodigo: paralelo.parCodigo,
                curparCodigo: paralelo.curparCodigo,
              }
              this.listaOfertaCursoPresentacion.push(Object.assign({ ...registro }, { ...objetoParalelo }))
            }
            resolve("OK");
          }, error: (error) => {
            console.log(error);
            rejects("Error");
          }
        });
      });
    }
  }

  listarJornada() {
    this.reanleCodigo = this.formPromedio.value.reanleCodigo;
    // Valida que se haya escogido una opción valida
    if (this.reanleCodigo == 0) {
      this.mensajeService.mensajeError('Escoja una opción...');
      return;
    }
    // Obtener regCodigo del elemento escogido
    this.buscarRegimenAnioLectivoPorCodigo();
    this.listaOfertaCursoJor = [];
    this.listaOfertaCursoMod = [];
    this.listaOfertaCursoEsp = [];
    this.listaJornada = [];
    this.listaModalidad = [];
    this.listaNivel = [];
    this.listaTipoNivel = [];
    this.listaEspecialidad = [];
    this.listaParalelo = [];
    this.jorNombre = '';
    this.modNombre = '';
    this.espDescripcion = '';
    this.parDescripcion = '';

    this.externoService.listaCursoPorInsestCodigo(this.codInstitucionEducativa).subscribe(
      (respuesta) => {
        this.listaOfertaCurso = respuesta['listado'];
        // Using ES6 - Filtrar OfertaCurso por: reanleCodigo y graCodigo in (16, 19)
        this.listaOfertaCursoJor = this.listaOfertaCurso.filter((ele) => ele.reanleCodigo == this.reanleCodigo && (ele.graCodigo == 16 || ele.graCodigo == 19));

        // Ordenar lista por Jornada
        this.listaOfertaCursoJor.sort((firstItem, secondItem) => firstItem.jorCodigo - secondItem.jorCodigo);

        // Recorrer lista para obtener Jornada del reanleCodigo
        for (const ele of this.listaOfertaCursoJor) {
          // Obtener lista Jornada
          this.externoService.buscarJornadaPorCodigo(ele.jorCodigo).subscribe(
            (respuesta) => {
              this.jornada = respuesta['objeto'];
              if (this.jorNombre != this.jornada.jorNombre) {
                this.jorNombre = this.jornada.jorNombre;
                this.listaJornada.push(this.jornada);
              }
            }
          )
        };
      }
    );
  }

  // Cargar información del Usuario y su contexto
  buscarInstitucion = async () => {
    await this.buscarInstitucionPorAmie("17H10864");
    await this.buscarInstitucionRegimenPorCodInstitucion();
    await this.consultarEstablecimientosPorCodInstitucion(this.codInstitucionEducativa);
    await this.consultarOfertaEstablecimientos(this.listaCodigosEstablecimientos);
    await this.listarRegimenAnioLectivo();
  }

  // consultar establecimientos por codigo de institución
  consultarEstablecimientosPorCodInstitucion(codInstitucion) {
    return new Promise((resolve, rejects) => {
      this.externoService.buscarEstablecimientosPorCodInstitucion(codInstitucion).subscribe({
        next: (response) => {
          this.listaCodigosEstablecimientos = response['listado'].map((registro) => registro.insestCodigo);
          resolve(response);
        }, error: (error) => {
          rejects("Error");
        }
      })
    })
  }

  // Consultar oferta educativa de todos los establecimientos
  consultarOfertaEstablecimientos(listaCodigoEstablecimientos) {
    return new Promise((resolve, rejects) => {
      this.externoService.listarOfertaPorListaEstablecimientos(listaCodigoEstablecimientos).subscribe({
        next: (response) => {
          this.listaOfertaCurso = response['listado']
          resolve(response);
        }, error: (error) => {
          console.log(error);
          rejects("Error");
        }
      })
    })
  }

  buscarInstitucionPorAmie(amie) {
    return new Promise((resolve, rejects) => {
      this.externoService.buscarInstitucionPorAmie(amie).subscribe({
        next: (response) => {
          this.codInstitucionEducativa = response['objeto'].insCodigo;
          resolve(response);
        }, error: (error) => {
          console.log(error);
          rejects("Error");
        }
      })
    })
  }

  // Cargar información del Usuario y su contexto por AMIE
  buscarInstitucionEducacivaPorAmie(amie: string) {
    return new Promise((resolve, rejects) => {
      this.externoService.buscarInstitucionEducacivaPorAmie(amie).subscribe({
        next: (response) => {
          this.institucion = response[0];
          this.codInstitucionEducativa = this.institucion.codInstitucionEducativa;
          resolve("OK");
        }, error: (error) => {
          console.log(error);
          rejects("Error");
        }
      });
    });
  }

  // Obtener institucion-regimen a partir del código de institucion del contexto
  buscarInstitucionRegimenPorCodInstitucion() {
    return new Promise((resolve, rejects) => {
      this.externoService.listarInstitucionRegimenPorCodigoInstitucion(this.codInstitucionEducativa).subscribe({
        next: (respuesta) => {
          this.listaInstitucionRegimen = respuesta['listado'];
          resolve("OK");
        }, error: (error) => {
          console.log(error);
          rejects("Error");
        }
      });
    });
  }

  openDetail(codjornada) {
    this.showDetail = true;
  }

  async guardarNotas(estudiante, indexSelec) {
    if (this.idInput === null) {
      // Guardar el primer registro en la misma fila
      this.guardarNota(estudiante, indexSelec);
      this.datosEditar = null;
      return;
    }
    if (this.idInput != indexSelec) {
      await this.verificarGuardarPendiente();
      if (this.continuarGuardarPendiente) {
        // Primero guardar los campos anteriores
        this.guardarNota(estudiante, indexSelec);
        // Reseteamos variables
        this.idInput = null;
        this.datosEditar = null;
        this.activarInput = false;
      }
    } else {
      this.guardarNota(estudiante, indexSelec);
      this.idInput = null;
      this.datosEditar = null;
      this.activarInput = false;
    }
  }

  async guardarNota(estudiante, indexSelec) {
    let promedioTotal = 0;
    let notaGuardada = 0;
    let errorGuardar = 0;
    for (const promedioAux of estudiante.listaNotas) {
      if (promedioAux.proValor >= promedioAux.mprDesde &&
        promedioAux.proValor <= promedioAux.mprHasta &&
        promedioAux.proValor != 0) {
        promedioTotal = promedioTotal + (promedioAux.proPorcentaje / 100) * Number(promedioAux ? promedioAux.proValor : 0);
        await new Promise((resolve, rejects) => {
          let promedio = new Promedio();
          promedio = this.moverDatosPromedio(promedioAux);
          this.promedioService.guardarPromedio(promedio).subscribe({
            next: (respuesta) => {
              promedio.proCodigo = respuesta['objeto'].proCodigo;
              notaGuardada = notaGuardada + 1;
              //this.mensajeService.mensajeCorrecto('Se ha guardado el registro correctamente...');
              resolve("OK");
            }, error: (error) => {
              this.mensajeService.mensajeError('Ha habido un problema al guardar el registro...' + error);
              rejects("Error");
            }
          });
        });
      } else {
        errorGuardar = errorGuardar + 1;
        this.controlarRangoNotas(promedioAux);
      }
    }
    if (errorGuardar == 0) {
      this.mensajeService.mensajeCorrecto('Se ha guardado las notas correctamente...');
    }
    estudiante.promedio = promedioTotal;
  }

  moverDatosPromedio(promedioAux: PromedioAux): Promedio {
    let promedio = new Promedio();
    promedio = {
      proCodigo: promedioAux.proCodigo,
      proEstado: promedioAux.proEstado,
      proValor: promedioAux.proValor,
      estCodigo: promedioAux.estCodigo,
      mprCodigo: promedioAux.mprCodigo,
    }

    return promedio;
  }

  controlarRangoNotas(promedioAux: PromedioAux) {
    if (promedioAux.proValor != 0) {
      this.mensajeService.mensajeAdvertencia("La nota " + promedioAux.proValor + " no se encuentra en el rango de " + promedioAux.mprDesde + " a " + promedioAux.mprHasta + ", vuelva a ingresar...  ");
      if (promedioAux.proCodigo == 0) {
        promedioAux.proValor = 0;
      } else {
        this.activarInput = false;
        this.listarEstudiantes(this.ofertaSeleccionada);
      }
    }
  }

  editarNota = async (estudiante, indexSelec) => {
    this.estudiante = estudiante;
    this.indexSelec = indexSelec;
    if (!this.datosEditar) { this.datosEditar = estudiante; }
    if (this.activarInput && this.idInput != indexSelec) {
      await this.verificarGuardarPendiente();
      if (this.continuarGuardarPendiente) {
        // Hicieron click en "Sí, Guardar"
        this.guardarNota(this.datosEditar, indexSelec);
        this.idInput = indexSelec;
        this.activarInput = false;
        this.datosEditar = null;
      } else {
        this.activarInput = false;
        this.listarEstudiantes(this.ofertaSeleccionada);
      }
    } else {
      this.idInput = indexSelec;
      this.activarInput = true;
    }
  }

  async verificarGuardarPendiente() {
    this.continuarGuardarPendiente = false;
    await new Promise((resolve, rejects) => {
      Swal
        .fire({
          title: "Actualizar Registro",
          text: "¿Aun tiene registros por guardar?'",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: "Sí, guardar",
          cancelButtonText: "Cancelar",
        })
        .then(async resultado => {
          if (resultado.value) {
            // Hicieron click en "Sí, Guardar"
            this.continuarGuardarPendiente = true;
          } else {
            // Hicieron click en "Cancelar"
            console.log("*Se cancela el proceso...*");
          }
          resolve(resultado);
        });
    })
  }

  capturarInputs(datosEstudiante) {
    this.datosEditar = datosEstudiante;
  }

  async listarEstudiantes(ofertaSeleccionada) {
    if (this.activarInput) {
      this.editarNota(this.estudiante, " ");
      return;
    }

    this.idInput = '';
    this.activarInput = false;
    this.ofertaSeleccionada = ofertaSeleccionada;
    await new Promise((resolve, rejects) => {
      this.externoService.listarModeloPromedioPorRegAniLecYTipoEducacion(this.ofertaSeleccionada.reanleCodigo, this.ofertaSeleccionada.tipeduCodigo).subscribe({
        next: (respuesta) => {
          this.listaModeloPromedio = respuesta['listado'];
          resolve("OK");
        }, error: (error) => {
          rejects("Error");
        }
      });
    });

    await new Promise((resolve, rejects) => {
      this.externoService.listarEstudiantesMatriculadosPorCurPar(this.ofertaSeleccionada.curparCodigo).subscribe({
        next: async (respuesta) => {
          this.listaEstudiantePresentacion = respuesta['listado'];
          for (const est of this.listaEstudiantePresentacion) {
            await new Promise((resolve, rejects) => {
              this.externoService.listarPromedioPorEstudianteYRegAniLec(est.estCodigo, est.reanleCodigo).subscribe({
                next: (respuesta) => {
                  let listNotas: PromedioAux[] = [];
                  let listNotasConsulta: PromedioAux[] = respuesta['listado'];
                  for (const modelo of this.listaModeloPromedio) {
                    let auxBusqueda = listNotasConsulta.find(obj => obj.mprCodigo == modelo.mprCodigo)
                    if (auxBusqueda) {
                      auxBusqueda.mprDesde = modelo.mprDesde;
                      auxBusqueda.mprHasta = modelo.mprHasta;
                      listNotas.push(auxBusqueda)
                    } else {
                      let nuevoPromedioAux = new PromedioAux();
                      nuevoPromedioAux = {
                        proCodigo: 0,
                        proEstado: 1,
                        proValor: 0,
                        estCodigo: est.estCodigo,
                        mprCodigo: modelo.mprCodigo,
                        mprDesde: modelo.mprDesde,
                        mprHasta: modelo.mprHasta,
                      }
                      listNotas.push(nuevoPromedioAux)
                    }
                  }
                  est.listaNotas = listNotas;
                  let promedioTotal = 0;
                  for (const nota of est.listaNotas) {
                    promedioTotal = promedioTotal + (nota.proPorcentaje / 100) * Number(nota ? nota.proValor : 0);
                  }
                  est.promedio = promedioTotal;
                  resolve("OK");
                }, error: (error) => {
                  console.log(error);
                  rejects("Error");
                }
              });
            });
          }
          resolve("OK");
        }, error: (error) => {
          console.log(error);
          rejects("Error");
        }
      });
    });
  }

  listarTipoTitulo() {
    this.catNivel = this.formPromedio.value.nivel;
  }

  closeDetail($event) {
    this.showDetail = $event;
    this.consejoEjecutivoSeleccionado = null;
  }

}
