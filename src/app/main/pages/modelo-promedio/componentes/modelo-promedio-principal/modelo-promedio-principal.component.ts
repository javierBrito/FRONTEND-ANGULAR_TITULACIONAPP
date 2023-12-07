import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginAplicacion } from 'app/auth/models/loginAplicacion';
import { Sede } from 'app/auth/models/sede';
import { CatAnioLectivo } from 'app/main/pages/compartidos/modelos/CatAnioLectivo';
import { TitModeloPromedio } from 'app/main/pages/compartidos/modelos/TitModeloPromedio';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import Swal from 'sweetalert2';
import { ModeloPromedioService } from '../../servicios/modelo-promedio.service';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-modelo-promedio-principal',
  templateUrl: './modelo-promedio-principal.component.html',
  styleUrls: ['./modelo-promedio-principal.component.scss']
})

export class ModeloPromedioPrincipalComponent implements OnInit {
  /*MODALES*/
  @ViewChild("modal_confirm_delete", { static: false }) modal_confirm_delete: TemplateRef<any>;
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;

  /*VARIABLES*/

  /*LISTAS*/
  public anioLectivo: CatAnioLectivo[] = [];
  public listaModeloPromedio: TitModeloPromedio[] = [];
  public listaPeriodoRegAniLec: any[];
  public listaPeriodoRegAniLecAux: any[];
  public listaServicioEducativo: any[];
  public periodoSeleccionado: any;

  /*TABs*/
  public selectedTab: number;
  public anioLecSeleccionado = null;

  /*OBJETOS*/
  private currentUser: LoginAplicacion;
  private sede: Sede;

  /*DETAIL*/
  public showDetail: boolean;

  /*PAGINACION*/
  public page: number;
  public pageVespertina: number;
  public pageNocturna: number;
  public itemsRegistros: number;

  /*OBJETOS*/
  public modeloPromedioSeleccionado: TitModeloPromedio;

  /*FORMULARIOS*/
  public formModeloPromedio: FormGroup;

  /*CONSTRUCTOR*/
  constructor(
    /*Servicios*/
    private readonly modeloPromedioService: ModeloPromedioService,
    private readonly mensajeService: MensajeService,
    private readonly externoService: ExternoService,
    private formBuilder: FormBuilder,
  ) {
    this.itemsRegistros = 5;
    this.page = 1;
    this.pageVespertina = 1;
    this.pageNocturna = 1;
    this.showDetail = false;
    this.selectedTab = 0;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
  }

  ngOnInit() {
    this.listarRegimenAnioLectivo();
    //this.listarServicioEducativos();
    this.formModeloPromedio = this.formBuilder.group({
      periodo: new FormControl('', Validators.required)
    });
  }

  listarRegimenAnioLectivo() {
    this.listaPeriodoRegAniLec = [];
    this.externoService.listarRegimenAnioLectivoActivo().subscribe(
      (respuesta) => {
        this.listaPeriodoRegAniLec = respuesta['listado'];
        for (const periodo of this.listaPeriodoRegAniLec) {
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
        }
        // Ordenar lista por reanleCodigo
        this.listaPeriodoRegAniLec.sort((firstItem, secondItem) => secondItem.reanleCodigo - firstItem.reanleCodigo);
      }
    );
  }

  listarServicioEducativos() {
    this.externoService.listarServicioEducativos().subscribe(
      (respuesta) => {
        this.listaServicioEducativo = respuesta['listado']
      }
    );
  }

  listarModeloPromedio() {
    let formModeloPromedioTemp = this.formModeloPromedio.value;
    this.periodoSeleccionado = formModeloPromedioTemp?.periodo;
    this.modeloPromedioService.listarModeloPromedioPorRegAniLec(this.periodoSeleccionado?.reanleCodigo).subscribe(
      (respuesta) => {
        this.listaModeloPromedio = respuesta['listado'];
        if (this.listaModeloPromedio.length < this.itemsRegistros) {
          this.page = 1;
        }
        for (const modeloPromedio of this.listaModeloPromedio) {
          this.externoService.buscarTipoEducacionPorCodigo(modeloPromedio.tipeduCodigo).subscribe(
            (respuesta) => {
              modeloPromedio.tipoEducacion = respuesta['objeto'];
            }
          )
          this.externoService.buscarCatalogoGradosPorCodigo(modeloPromedio.graCodigo).subscribe(
            (respuesta) => {
              modeloPromedio.grado = respuesta['objeto'];
            }
          )
        }
      }
    );
  }

  listaModeloPromedioActualizada(event) {
    this.listaModeloPromedio = event;
    if (this.listaModeloPromedio.length < this.itemsRegistros) {
      this.page = 1;
    }
    for (const modeloPromedio of this.listaModeloPromedio) {
      this.externoService.buscarTipoEducacionPorCodigo(modeloPromedio.tipeduCodigo).subscribe(
        (respuesta) => {
          modeloPromedio.tipoEducacion = respuesta['objeto'];
        }
      )
      this.externoService.buscarCatalogoGradosPorCodigo(modeloPromedio.graCodigo).subscribe(
        (respuesta) => {
          modeloPromedio.grado = respuesta['objeto'];
        }
      )
    }
  }

  openDetail() {
    this.showDetail = true;
  }

  openEditarDetail(modeloPromedio: TitModeloPromedio) {
    this.modeloPromedioSeleccionado = modeloPromedio;
    this.showDetail = true;
  }

  openRemoverDetail(modeloPromedio: TitModeloPromedio) {
    Swal
      .fire({
        title: "Eliminar Registro",
        text: "¿Quieres borrar el registro?'",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí, eliminar"
          this.modeloPromedioService.eliminarModeloPromedioPorId(modeloPromedio.mprCodigo).subscribe({
            next: (response) => {
              this.listarModeloPromedio();
              Swal.fire('El registro ha sido borrada con éxito...', '', 'success');
              this.mensajeService.mensajeCorrecto('El registro ha sido borrada con éxito...');
              this.page = 1
            },
            error: (error) => {
              Swal.fire('Ha habido un problema al borrar el registro...', '', 'error');
              this.mensajeService.mensajeError('Ha habido un problema al borrar el registro...');
            }
          });
        } else {
          // Hicieron click en "Cancelar"
          console.log("*Se cancela el proceso...*");
        }
      });
  }

  closeDetail($event) {
    this.showDetail = $event;
    this.modeloPromedioSeleccionado = null;
  }

}