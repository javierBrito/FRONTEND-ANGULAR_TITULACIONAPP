import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Sede } from 'app/auth/models/sede';
import { CatTipoEducacion } from 'app/main/pages/compartidos/modelos/CatTipoEducacion';
import { TitModeloCalificacion } from 'app/main/pages/compartidos/modelos/TitModeloCalificacion';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import { DetailComponent } from 'app/main/pages/modelo-calificacion/componentes/detail/detail.component';
import { ModeloCalificacionService } from '../../../servicios/modelo-calificacion.service';

@Component({
  selector: 'app-form-modelo-calificacion',
  templateUrl: './form-modelo-calificacion.component.html',
  styleUrls: ['./form-modelo-calificacion.component.scss']
})
export class FormModeloCalificacionComponent implements OnInit {
  /*OUTPUT ENVIAN*/
  @Output() close: EventEmitter<boolean>;
  @Output() listaModeloCalificacion: EventEmitter<any>;

  /*INPUT RECIBEN*/
  @Input() listaModeloCalificacionChild: any;
  @Input() reanleCodigoChild: any;
  @Input() modeloCalificacionEditar: TitModeloCalificacion;

  /*MODALES*/
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;

  /*VARIABLES */
  public showDetail: boolean;
  private currentUser: any;
  private sede: Sede;
  private reanleCodigo: any;

  /*FORMULARIOS*/
  public formModeloCalificacion: FormGroup;

  /*OBJETOS*/
  public modeloCalificacion: TitModeloCalificacion;

  /*LISTAS*/
  public listaTipoEducacion: CatTipoEducacion[];

  /*CONSTRUCTOR*/
  constructor(
    private readonly modeloCalificacionService: ModeloCalificacionService,
    private readonly mensajeService: MensajeService,
    private readonly externoService: ExternoService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
    this.close = new EventEmitter<boolean>();
    this.listaModeloCalificacion = new EventEmitter<any>();
    this.showDetail = true;

    /*LISTAS EXTERNAS*/
    this.listarTipoEducacion();
  }

  ngOnInit() {
    this.reanleCodigo = this.reanleCodigoChild;
    if (this.modeloCalificacionEditar) {
      this.formModeloCalificacion = this.formBuilder.group({
        tipeduCodigo: new FormControl(this.modeloCalificacionEditar.tipeduCodigo, Validators.required),
        txtDenominacion: new FormControl(this.modeloCalificacionEditar.mcaDenominacion, Validators.required),
        numCalificacionDesde: new FormControl(this.modeloCalificacionEditar.mcaDesde, Validators.required),
        numCalificacionHasta: new FormControl(this.modeloCalificacionEditar.mcaHasta, Validators.required),
        numPorcentaje: new FormControl(this.modeloCalificacionEditar.mcaPorcentaje, Validators.required),
        mcaFormula: new FormControl(this.modeloCalificacionEditar.mcaFormula, Validators.required),
      })
      //AQUI TERMINA ACTUALIZAR
    } else {
      this.formModeloCalificacion = this.formBuilder.group({
        tipeduCodigo: new FormControl('', Validators.required),
        txtDenominacion: new FormControl('', Validators.required),
        numCalificacionDesde: new FormControl('', Validators.required),
        numCalificacionHasta: new FormControl('', Validators.required),
        numPorcentaje: new FormControl('', Validators.required),
        mcaFormula: new FormControl('', Validators.required),
      })
    }
  }

  listarTipoEducacion() {
    this.externoService.listarTipoEducacion().subscribe(
      (respuesta) => {
        this.listaTipoEducacion = respuesta['listado'];
      }
    );
  }

  async listarModeloCalificacionAsyn() {
    this.modeloCalificacionService.listarModeloCalificacionPorRegAniLec(this.reanleCodigo).subscribe(
      (respuesta) => {
        this.listaModeloCalificacionChild = respuesta['listado']
        this.listaModeloCalificacion.emit(this.listaModeloCalificacionChild);
      }
    );
  }

  addRegistro() {
    if (this.formModeloCalificacion?.valid) {
      let modeloCalificacionTemp = this.formModeloCalificacion.value;
      this.modeloCalificacion = new TitModeloCalificacion({
        mcaDenominacion: modeloCalificacionTemp.txtDenominacion,
        mcaDesde: modeloCalificacionTemp.numCalificacionDesde,
        mcaHasta: modeloCalificacionTemp.numCalificacionHasta,
        mcaPorcentaje: modeloCalificacionTemp.numPorcentaje,
        mcaFormula: modeloCalificacionTemp.mcaFormula,
        reanleCodigo: this.reanleCodigo,
        tipeduCodigo: modeloCalificacionTemp.tipeduCodigo,
        mcaEstado: 1,
      });
    }

    if (this.modeloCalificacionEditar) {
      this.modeloCalificacion['data'].mcaCodigo = this.modeloCalificacionEditar.mcaCodigo;
      this.modeloCalificacionService.guardarModeloCalificacion(this.modeloCalificacion['data']).subscribe({
        next: (response) => {
          this.listarModeloCalificacionAsyn();
          this.mensajeService.mensajeCorrecto('Se ha actualizado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeError('Ha habido un problema al actualizar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    } else {
      this.modeloCalificacionService.guardarModeloCalificacion(this.modeloCalificacion['data']).subscribe({
        next: async (response) => {
          this.listarModeloCalificacionAsyn();
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

  closeDetail($event) {
    this.close.emit($event);
  }

  get denominacionField() {
    return this.formModeloCalificacion.get('txtDenominacion');
  }
  get calificacionDesdeField() {
    return this.formModeloCalificacion.get('numCalificacionDesde');
  }
  get calificacionHastaField() {
    return this.formModeloCalificacion.get('numCalificacionHasta');
  }
  get porcentajeField() {
    return this.formModeloCalificacion.get('numPorcentaje');
  }
  get mcaFormulaField() {
    return this.formModeloCalificacion.get('mcaFormula');
  }  
}
