import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginAplicacion } from 'app/auth/models/loginAplicacion';
import { Sede } from 'app/auth/models/sede';
import { CatAnioLectivo } from 'app/main/pages/compartidos/modelos/CatAnioLectivo';
import { TitModeloCalificacion } from 'app/main/pages/compartidos/modelos/TitModeloCalificacion';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import Swal from 'sweetalert2';
import { ModeloCalificacionService } from '../../servicios/modelo-calificacion.service';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-modelo-calificacion-principal',
  templateUrl: './modelo-calificacion-principal.component.html',
  styleUrls: ['./modelo-calificacion-principal.component.scss']
})

export class ModeloCalificacionPrincipalComponent implements OnInit {
  /*MODALES*/
  @ViewChild("modal_confirm_delete", { static: false }) modal_confirm_delete: TemplateRef<any>;
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;

  /*VARIABLES*/
  public reanleCodigo: number;

  /*LISTAS*/
  public anioLectivo: CatAnioLectivo[] = [];
  public listaModeloCalificacion: TitModeloCalificacion[] = [];
  public listaPeriodoRegAniLec: any[];
  public listaNemonicos: string[] = [];

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
  public modeloCalificacionSeleccionado: TitModeloCalificacion;

  /*FORMULARIOS*/
  public formModeloCalificacion: FormGroup;

  /*CONSTRUCTOR*/
  constructor(
    /*Servicios*/
    private readonly modeloCalificacionService: ModeloCalificacionService,
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
    this.reanleCodigo = 0;
  }

  ngOnInit() {
    // Pruebas de manejo de cadenas
    let mcaFormula = "(EGB8 + EGB9+ EGB10 + EGB11)/4";
    mcaFormula = mcaFormula.toUpperCase();
    mcaFormula = mcaFormula.split(" ").join("")
    const numeros = /[0-9]/;
    let letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let operadores = ' +*/()';
    let nemonicoAux = "";
    let divisor1 = 0;
    for (let i = 0; i < mcaFormula?.length; i++) {   
      if (operadores.indexOf(mcaFormula.charAt(i)) > 0) {
        console.log("operador = " + i + " ", mcaFormula.charAt(i));
        if (nemonicoAux != "") {
          this.listaNemonicos.push(nemonicoAux);
          divisor1 = divisor1 + 1;
        }
        nemonicoAux = "";
      }
      if (letras.indexOf(mcaFormula.charAt(i)) > 0 || numeros.test(mcaFormula.charAt(i))) {
        console.log("letra o numero = " + i + " ", mcaFormula.charAt(i));
        nemonicoAux = nemonicoAux + mcaFormula.charAt(i);
        console.log("nemonicoAux = ", nemonicoAux);
      }
    }
    console.log("this.listaNemonicos I = ", this.listaNemonicos);
    console.log("divisor1 = ", divisor1);

    this.listaNemonicos = [];
    console.log("mcaFormula = ", mcaFormula);
    // Obtener divisor
    let divisor = mcaFormula.substring(mcaFormula.indexOf("/") + 1);
    let numDivisor = Number(divisor);
    // Obtener operandos
    console.log("mcaFormula subcadena nemonicos = ", mcaFormula.substring(mcaFormula.indexOf("(") + 1, mcaFormula.indexOf(")")));
    let nemonico1 = mcaFormula.substring(mcaFormula.indexOf("(") + 1, mcaFormula.indexOf("+"));
    this.listaNemonicos.push(nemonico1);
    console.log("mcaFormula subcadena nemonico1 = ", nemonico1.trim());
    let nemonico2 = mcaFormula.substring(mcaFormula.indexOf("+") + 1, mcaFormula.indexOf(")"));
    console.log("mcaFormula subcadena nemonico2 = ", nemonico2.trim());
    if (nemonico2.indexOf("+") > 0) {
      let nemonico21 = nemonico2.substring(0, nemonico2.indexOf("+"));
      this.listaNemonicos.push(nemonico21);
      console.log("nemonico21 = ", nemonico21);
      console.log("Continua proceso 1");
      let nemonico3 = nemonico2.substring(nemonico2.indexOf("+") + 1);
      console.log("nemonico3 = ", nemonico3);
      if (nemonico3.indexOf("+") > 0) {
        let nemonico31 = nemonico3.substring(0, nemonico3.indexOf("+"));
        this.listaNemonicos.push(nemonico31);
        console.log("nemonico31 = ", nemonico31);
        console.log("Continua proceso 2");
        let nemonico4 = nemonico3.substring(nemonico3.indexOf("+") + 1);
        console.log("nemonico4 = ", nemonico4);
        if (nemonico4.indexOf("+") > 0) {
          console.log("Continua Proceso 3");
        } else {
          this.listaNemonicos.push(nemonico4);
        }
      } else {
        this.listaNemonicos.push(nemonico3);
      }
    } else {
      console.log("Fin proceso");
      this.listaNemonicos.push(nemonico2);
    }
    console.log("this.listaNemonicos = ", this.listaNemonicos);

    // Fin Pruebas de manejo de cadenas
    this.listarRegimenAnioLectivo();
    this.formModeloCalificacion = this.formBuilder.group({
      reanleCodigo: new FormControl('', Validators.required)
    })
  }

  listarRegimenAnioLectivo() {
    this.externoService.listarRegimenAnioLectivoActivo().subscribe(
      (respuesta) => {
        this.listaPeriodoRegAniLec = respuesta['listado']
        for (const periodo of this.listaPeriodoRegAniLec) {
          this.externoService.buscarAnioLectivoPorCodigo(periodo.anilecCodigo).subscribe(
            (respuesta) => {
              periodo.CatAnioLectivo = respuesta['objeto']
            }
          )
          this.externoService.buscarRegimenPorCodigo(periodo.regCodigo).subscribe(
            (respuesta) => {
              periodo.CatRegimen = respuesta['objeto']
            }
          )
        }
        // Ordenar lista por regCodigo
        this.listaPeriodoRegAniLec.sort((firstItem, secondItem) => secondItem.reanleCodigo - firstItem.reanleCodigo);
      }
    );
  }

  listarModeloCalificacion() {
    this.reanleCodigo = this.formModeloCalificacion.value.reanleCodigo;
    this.modeloCalificacionService.listarModeloCalificacionPorRegAniLec(this.reanleCodigo).subscribe(
      (respuesta) => {
        this.listaModeloCalificacion = respuesta['listado'];
        if (this.listaModeloCalificacion.length < this.itemsRegistros) {
          this.page = 1;
        }
        for (const modeloCalificacion of this.listaModeloCalificacion) {
          this.externoService.buscarTipoEducacionPorCodigo(modeloCalificacion.tipeduCodigo).subscribe(
            (respuesta) => {
              modeloCalificacion.tipoEducacion = respuesta['objeto'];
            }
          )
        }
      }
    );
  }

  listaModeloCalificacionActualizada(event) {
    this.listaModeloCalificacion = event;
    if (this.listaModeloCalificacion.length < this.itemsRegistros) {
      this.page = 1;
    }
    for (const modeloCalificacion of this.listaModeloCalificacion) {
      this.externoService.buscarTipoEducacionPorCodigo(modeloCalificacion.tipeduCodigo).subscribe(
        (respuesta) => {
          modeloCalificacion.tipoEducacion = respuesta['objeto'];
        }
      )
    }
  }

  openDetail() {
    this.showDetail = true;
  }

  openEditarDetail(modeloCalificacion: TitModeloCalificacion) {
    this.modeloCalificacionSeleccionado = modeloCalificacion;
    this.showDetail = true;
  }

  openRemoverDetail(modeloCalificacion: TitModeloCalificacion) {
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
          this.modeloCalificacionService.eliminarModeloCalificacionPorId(modeloCalificacion.mcaCodigo).subscribe({
            next: (response) => {
              this.listarModeloCalificacion();
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
    this.modeloCalificacionSeleccionado = null;
  }

}
