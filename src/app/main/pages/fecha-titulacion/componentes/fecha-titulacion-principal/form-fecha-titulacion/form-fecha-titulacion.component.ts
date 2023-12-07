import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Sede } from 'app/auth/models/sede';
import { DetailComponent } from 'app/main/pages/fecha-titulacion/componentes/detail/detail.component';
import { FechaTitulacionService } from '../../../servicios/fecha-titulacion.service';
import dayjs from "dayjs";
import { TitFechaTitulacion } from 'app/main/pages/compartidos/modelos/TitFechaTitulacion';
import { CatTipoEducacion } from 'app/main/pages/compartidos/modelos/CatTipoEducacion';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { CatAnioLectivo } from 'app/main/pages/compartidos/modelos/CatAnioLectivo';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';

@Component({
  selector: 'app-form-fecha-titulacion',
  templateUrl: './form-fecha-titulacion.component.html',
  styleUrls: ['./form-fecha-titulacion.component.scss']
})

export class FormFechaTitulacionComponent implements OnInit {
  /*OUTPUT ENVIAN*/
  @Output() close: EventEmitter<boolean>;
  @Output() listaFechaTitulacion: EventEmitter<any>;

  /*INPUT RECIBEN*/
  @Input() listaFechaTitulacionChild: any;
  @Input() fechaTitulacionEditar: TitFechaTitulacion;

  /*MODALES*/
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;

  /*VARIABLES */
  public showDetail: boolean;

  /*Variables*/
  private amieRegex: string;
  private currentUser: any;
  private sede: Sede;
  private anioLectivo: any;

  /*Formularios*/
  public formFechaTitulacion: FormGroup;

  /*OBJETOS*/
  public fechaTitulacion: TitFechaTitulacion;

  /*LISTAS*/
  public listaTipoEducacion: CatTipoEducacion[];
  public listaAnioLectivo: CatAnioLectivo;
  public listaPeriodoRegAniLec: any[];

  /*CONSTRUCTOR*/
  constructor(
    private fechaTitulacionService: FechaTitulacionService,
    private mensajeService: MensajeService,
    private externoService: ExternoService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
    this.close = new EventEmitter<boolean>();
    this.listaFechaTitulacion = new EventEmitter<any>();
    this.showDetail = true;

    /*LISTAS EXTERNAS*/
    this.listarRegimenAnioLectivoActivo();
    this.listarTipoEducacion();
  }

  ngOnInit() {
    if (this.fechaTitulacionEditar) {
      this.formFechaTitulacion = this.formBuilder.group({
        reanleCodigo: new FormControl(this.fechaTitulacionEditar.reanleCodigo, Validators.required),
        tipeduCodigo: new FormControl(this.fechaTitulacionEditar.tipeduCodigo, Validators.required),
        fInicioGeneral: new FormControl(dayjs(this.fechaTitulacionEditar.ftiInicioGeneral).format("YYYY-MM-DD"), Validators.compose([Validators.required, ,])),
        fFinGeneral: new FormControl(dayjs(this.fechaTitulacionEditar.ftiFinGeneral).format("YYYY-MM-DD"), Validators.required),
        fInicioExonerado: new FormControl(dayjs(this.fechaTitulacionEditar.ftiInicioExonerado).format("YYYY-MM-DD"), Validators.required),
        fFinExonerado: new FormControl(dayjs(this.fechaTitulacionEditar.ftiFinExonerado).format("YYYY-MM-DD"), Validators.required),
        fechaGrado: new FormControl(dayjs(this.fechaTitulacionEditar.ftiFechaGrado).format("YYYY-MM-DD"), Validators.required),
      })
      //AQUI TERMINA EDITAR
    } else {
      this.formFechaTitulacion = this.formBuilder.group({
        reanleCodigo: new FormControl('', Validators.required),
        tipeduCodigo: new FormControl('', Validators.required),
        fInicioGeneral: new FormControl('', Validators.compose([Validators.required, ,])),
        fFinGeneral: new FormControl('', Validators.required),
        fInicioExonerado: new FormControl('', Validators.required),
        fFinExonerado: new FormControl('', Validators.required),
        fechaGrado: new FormControl('', Validators.required),
      })
    }
  }

  listarRegimenAnioLectivoActivo() {
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

  listarTipoEducacion() {
    this.externoService.listarTipoEducacion().subscribe(
      (respuesta) => {
        this.listaTipoEducacion = respuesta['listado'];
      }
    );
  }

  addRegistro() {
    if (this.formFechaTitulacion?.valid) {
      let fechaTitulacionTemp = this.formFechaTitulacion.value;
      this.fechaTitulacion = new TitFechaTitulacion({
        reanleCodigo: fechaTitulacionTemp.reanleCodigo,
        tipeduCodigo: fechaTitulacionTemp.tipeduCodigo,
        ftiFechaGrado: dayjs(fechaTitulacionTemp.fechaGrado).format("YYYY-MM-DD HH:mm:ss.SSS"),
        ftiInicioGeneral: dayjs(fechaTitulacionTemp.fInicioGeneral).format("YYYY-MM-DD HH:mm:ss.SSS"),
        ftiFinGeneral: dayjs(fechaTitulacionTemp.fFinGeneral).format("YYYY-MM-DD HH:mm:ss.SSS"),
        ftiInicioExonerado: dayjs(fechaTitulacionTemp.fInicioExonerado).format("YYYY-MM-DD HH:mm:ss.SSS"),
        ftiFinExonerado: dayjs(fechaTitulacionTemp.fFinExonerado).format("YYYY-MM-DD HH:mm:ss.SSS"),
        ftiEstado: 1,
      });
    }

    if (this.fechaTitulacionEditar) {
      this.fechaTitulacion['data'].ftiCodigo = this.fechaTitulacionEditar.ftiCodigo;
      this.fechaTitulacionService.guardarFechaTitulacion(this.fechaTitulacion['data']).subscribe({
        next: (response) => {
          this.listarFechaTitulacion();
          this.mensajeService.mensajeCorrecto('Se ha actualizado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeError('Ha habido un problema al actualizar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    } else {
      this.fechaTitulacionService.guardarFechaTitulacion(this.fechaTitulacion['data']).subscribe({
        next: async (response) => {
          this.listarFechaTitulacion();
          this.mensajeService.mensajeCorrecto('Se ha agregado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeError('Ha habido un problema al agregar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    }
  }

  listarFechaTitulacion() {
    this.fechaTitulacionService.listarFechaTitulacionActivo().subscribe(
      (respuesta) => {
        this.listaFechaTitulacionChild = respuesta['listado'];
        for (const fecha of this.listaFechaTitulacionChild) {
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
        this.listaFechaTitulacion.emit(this.listaFechaTitulacionChild);
      }
    );
  }

  closeDetail($event) {
    this.close.emit($event);
  }

  get fInicioGeneralField() {
    return this.formFechaTitulacion.get('fInicioGeneral');
  }
  get fFinGeneralField() {
    return this.formFechaTitulacion.get('fFinGeneral');
  }
  get fFinExoneradoField() {
    return this.formFechaTitulacion.get('fFinExonerado');
  }
  get fInicioExoneradoField() {
    return this.formFechaTitulacion.get('fInicioExonerado');
  }
  get fechaGradoField() {
    return this.formFechaTitulacion.get('fechaGrado');
  }
  get tipoEducacionField() {
    return this.formFechaTitulacion.get('tipoEducacion');
  }
  get anioLectivoField() {
    return this.formFechaTitulacion.get('anioLectivo');
  }
}
