import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginAplicacion } from 'app/auth/models/loginAplicacion';
import { Sede } from 'app/auth/models/sede';
import { FechaTitulacionService } from '../../servicios/fecha-titulacion.service';
import dayjs from "dayjs";
import { CatAnioLectivo } from 'app/main/pages/compartidos/modelos/CatAnioLectivo';
import { TitFechaTitulacion } from 'app/main/pages/compartidos/modelos/TitFechaTitulacion';
import { DetailComponent } from '../detail/detail.component';
import Swal from 'sweetalert2';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';

@Component({
  selector: 'app-fecha-titulacion-principal',
  templateUrl: './fecha-titulacion-principal.component.html',
  styleUrls: ['./fecha-titulacion-principal.component.scss']
})

export class FechaTitulacionPrincipalComponent implements OnInit {
  /*MODALES*/
  @ViewChild("modal_confirm_delete", { static: false }) modal_confirm_delete: TemplateRef<any>;
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;

  /*LISTAS*/
  public anioLectivo: CatAnioLectivo[] = [];
  public listaFechaTitulacion: TitFechaTitulacion[] = [];

  /*TABS*/
  public selectedTab: number;
  public anioLecSeleccionada = null;

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
  public fechaTitulacionSeleccionado: TitFechaTitulacion;

  /*CONSTRUCTOR*/
  constructor(
    /*Servicios*/
    private readonly externoService: ExternoService,
    private readonly fechaTitulacionService: FechaTitulacionService,
    private mensajeService: MensajeService
  ) {
    this.itemsRegistros = 5;
    this.page = 1;
    this.showDetail = false;
    this.selectedTab = 0;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
  }

  ngOnInit() {
    this.listarFechaTitulacion();
  }

  listarFechaTitulacion() {
    this.fechaTitulacionService.listarFechaTitulacionActivo().subscribe(
      (respuesta) => {
        this.listaFechaTitulacion = respuesta['listado'];
        if (this.listaFechaTitulacion.length < this.itemsRegistros) {
          this.page = 1;
        }
        for (const fecha of this.listaFechaTitulacion) {
          this.externoService.buscarRegimenAnioLectivoPorCodigo(fecha.reanleCodigo).subscribe(
            (respuesta) => {
              respuesta['objeto'];
              this.externoService.buscarAnioLectivoPorCodigo(respuesta['objeto'].anilecCodigo).subscribe(
                (respuesta) => {
                  fecha.CatAnioLectivo = respuesta['objeto']
                }
              )
              this.externoService.buscarRegimenPorCodigo(respuesta['objeto'].regCodigo).subscribe(
                (respuesta) => {
                  fecha.CatRegimen = respuesta['objeto']
                }
              )
            }
          )
          this.externoService.buscarTipoEducacionPorCodigo(fecha.tipeduCodigo).subscribe(
            (respuesta) => {
              fecha.tipoEducacion = respuesta['objeto'];
            }
          )
          fecha.ftiFechaGrado = dayjs(fecha.ftiFechaGrado).format("YYYY-MM-DD")
          fecha.ftiInicioGeneral = dayjs(fecha.ftiInicioGeneral).format("YYYY-MM-DD")
          fecha.ftiFinGeneral = dayjs(fecha.ftiFinGeneral).format("YYYY-MM-DD")
          fecha.ftiFinExonerado = dayjs(fecha.ftiFinExonerado).format("YYYY-MM-DD")
          fecha.ftiInicioExonerado = dayjs(fecha.ftiInicioExonerado).format("YYYY-MM-DD")
        }
      }
    );
  }

  listaFechaTitulacionActualizada(event) {
    this.listaFechaTitulacion = event;
    for (const fecha of this.listaFechaTitulacion) {
      this.externoService.buscarRegimenAnioLectivoPorCodigo(fecha.reanleCodigo).subscribe(
        (respuesta) => {
          respuesta['objeto'];
          this.externoService.buscarAnioLectivoPorCodigo(respuesta['objeto'].anilecCodigo).subscribe(
            (respuesta) => {
              fecha.CatAnioLectivo = respuesta['objeto']
            }
          )
          this.externoService.buscarRegimenPorCodigo(respuesta['objeto'].regCodigo).subscribe(
            (respuesta) => {
              fecha.CatRegimen = respuesta['objeto']
            }
          )
        }
      )
      this.externoService.buscarTipoEducacionPorCodigo(fecha.tipeduCodigo).subscribe(
        (respuesta) => {
          fecha.tipoEducacion = respuesta['objeto'];
        }
      )
      fecha.ftiFechaGrado = dayjs(fecha.ftiFechaGrado).format("YYYY-MM-DD")
      fecha.ftiInicioGeneral = dayjs(fecha.ftiInicioGeneral).format("YYYY-MM-DD")
      fecha.ftiFinGeneral = dayjs(fecha.ftiFinGeneral).format("YYYY-MM-DD")
      fecha.ftiFinExonerado = dayjs(fecha.ftiFinExonerado).format("YYYY-MM-DD")
      fecha.ftiInicioExonerado = dayjs(fecha.ftiInicioExonerado).format("YYYY-MM-DD")
    }
  }

  openDetail() {
    this.showDetail = true;
  }

  openEditarDetail(fechaTitulacion: TitFechaTitulacion) {
    this.fechaTitulacionSeleccionado = fechaTitulacion;
    this.showDetail = true;
  }

  openRemoverDetail(fechaTitulacion: TitFechaTitulacion) {
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
          this.fechaTitulacionService.eliminarFechaTitulacionPorId(fechaTitulacion.ftiCodigo).subscribe({
            next: (response) => {
              this.mensajeService.mensajeCorrecto('El registro ha sido borrado con éxito...');
              this.listarFechaTitulacion();
              this.page = 1
            },
            error: (error) => {
              this.mensajeService.mensajeCorrecto('Ha habido un problema al borrar el registro...');
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
    this.fechaTitulacionSeleccionado = null;
  }

}

