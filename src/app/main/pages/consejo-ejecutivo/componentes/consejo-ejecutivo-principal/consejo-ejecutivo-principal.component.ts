import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginAplicacion } from 'app/auth/models/loginAplicacion';
import { Sede } from 'app/auth/models/sede';
import { CatAnioLectivo } from 'app/main/pages/compartidos/modelos/CatAnioLectivo';
import { TitConsejoEjecutivo } from 'app/main/pages/compartidos/modelos/TitConsejoEjecutivo';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import Swal from 'sweetalert2';
import { ConsejoEjecutivoService } from '../../servicios/consejo-ejecutivo.service';

@Component({
  selector: 'app-consejo-ejecutivo-principal',
  templateUrl: './consejo-ejecutivo-principal.component.html',
  styleUrls: ['./consejo-ejecutivo-principal.component.scss']
})
export class ConsejoEjecutivoPrincipalComponent implements OnInit {
  /*MODALES*/
  @ViewChild("modal_confirm_delete", { static: false }) modal_confirm_delete: TemplateRef<any>;
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;

  /*VARIABLES*/
  public insCodigo: number;
  public institucion: any;
  public reanleCodigo = null;

  /*LISTAS*/
  public listaConsejosEjecutivos: TitConsejoEjecutivo[] = [];
  public listaAnioLectivo: CatAnioLectivo;
  public listaPeriodoRegAniLec: any[];

  /*TABS*/
  public selectedTab: number;

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
  public consejoEjecutivoSeleccionado: TitConsejoEjecutivo;

  /*FORMULARIOS*/
  public formConsejoEjecutivo: FormGroup;
  
  /*CONSTRUCTOR */
  constructor(
    /*Servicios*/
    private readonly consejoEjecutivoService: ConsejoEjecutivoService,
    private mensajeService: MensajeService,
    private externoService: ExternoService,
    private formBuilder: FormBuilder,
  ) {
    this.insCodigo = 0;
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
    this.buscarInstitucionEducacivaPorAmie(this.sede.nemonico);
    this.formConsejoEjecutivo = this.formBuilder.group({
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
      }
    );
  }

  buscarInstitucionEducacivaPorAmie(amie: string) {
    this.externoService.buscarInstitucionEducacivaPorAmie(amie).subscribe({
      next: (response) => {
        this.institucion = response[0];
        if (this.institucion != undefined) {
          this.insCodigo = this.institucion.codInstitucionEducativa;
        } else {
          this.insCodigo = 1;
          Swal.fire('No existe la institución atada al usuario del sistema...', '', 'error');
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  listarConsejoEjecutivo() {
    this.reanleCodigo = this.formConsejoEjecutivo.value.reanleCodigo;
    this.consejoEjecutivoService.listarConsejoEjecPorInstitucionYAnioLectivo(this.insCodigo, this.reanleCodigo).subscribe(
      (respuesta) => {
        this.listaConsejosEjecutivos = respuesta['listado'];
        for (const ele of this.listaConsejosEjecutivos) {
          this.consejoEjecutivoService.buscarCargoPorId(ele.carCodigo).subscribe(
            (respuesta) => {
              ele.cargo = respuesta['objeto'];
            }
          )
        }
      }
    );
  }

  listaConsejoEjecutivoActualizada(event) {
    this.listaConsejosEjecutivos = event;
  }

  openDetail(codjornada) {
    this.showDetail = true;
  }

  openEditarDetail(consejoEjecutivo: TitConsejoEjecutivo) {
    this.consejoEjecutivoSeleccionado = consejoEjecutivo;
    this.showDetail = true;
  }

  openRemoverDetail(consejoEjecutivo: TitConsejoEjecutivo) {
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
          this.consejoEjecutivoService.eliminarConsejoEjecutivoPorId(consejoEjecutivo.cejCodigo).subscribe({
            next: (response) => {
              this.listarConsejoEjecutivo();
              this.mensajeService.mensajeCorrecto('El registro ha sido borrada con éxito...');
            },
            error: (error) => {
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
    this.consejoEjecutivoSeleccionado = null;
  }

}
