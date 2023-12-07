import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Sede } from 'app/auth/models/sede';
import { CatGrado } from 'app/main/pages/compartidos/modelos/CatGrado';
import { CatTipoEducacion } from 'app/main/pages/compartidos/modelos/CatTipoEducacion';
import { TitModeloPromedio } from 'app/main/pages/compartidos/modelos/TitModeloPromedio';
import { ExternoService } from 'app/main/pages/compartidos/servicios/externo/externo.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import { DetailComponent } from 'app/main/pages/modelo-promedio/componentes/detail/detail.component';
import { ModeloPromedioService } from '../../../servicios/modelo-promedio.service';
import { CatServicioEducativo } from 'app/main/pages/compartidos/modelos/CatServicioEducativo';

@Component({
  selector: 'app-form-modelo-promedio',
  templateUrl: './form-modelo-promedio.component.html',
  styleUrls: ['./form-modelo-promedio.component.scss']
})
export class FormModeloPromedioComponent implements OnInit {
  /*OUTPUT ENVIAN*/
  @Output() close: EventEmitter<boolean>;
  @Output() listaModeloPromedio: EventEmitter<any>;

  /*INPUT RECIBEN*/
  @Input() listaModeloPromedioChild: any;
  @Input() modeloPromedioEditar: TitModeloPromedio;
  @Input() periodoSeleccionado: CatServicioEducativo;

  /*MODALES*/
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;

  /*VARIABLES */
  public showDetail: boolean;
  private currentUser: any;
  private sede: Sede;
  private reanleCodigo: any;
  private tipeduCodigo: number;

  /*FORMULARIOS*/
  public formModeloPromedio: FormGroup;

  /*OBJETOS*/
  public modeloPromedio: TitModeloPromedio;

  /*LISTAS*/
  public listaTipoEducacion: CatTipoEducacion[];
  public listaGrado: CatGrado[];

  /*CONSTRUCTOR*/
  constructor(
    private readonly modeloPromedioService: ModeloPromedioService,
    private readonly mensajeService: MensajeService,
    private readonly externoService: ExternoService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
    this.close = new EventEmitter<boolean>();
    this.listaModeloPromedio = new EventEmitter<any>();
    this.showDetail = true;

    /*LISTAS EXTERNAS*/
    this.listarTipoEducacion();
    this.listarCatalogoGrados();
  }

  ngOnInit() {
    //this.tipeduCodigo = this.periodoSeleccionado?.tipeduCodigo;
    this.tipeduCodigo =  1;
    this.reanleCodigo = this.periodoSeleccionado?.reanleCodigo;
    if (this.modeloPromedioEditar) {
      this.formModeloPromedio = this.formBuilder.group({
        graCodigo: new FormControl(this.modeloPromedioEditar.graCodigo, Validators.required),
        mprDenominacion: new FormControl(this.modeloPromedioEditar.mprDenominacion, Validators.required),
        mprDesde: new FormControl(this.modeloPromedioEditar.mprDesde, Validators.required),
        mprHasta: new FormControl(this.modeloPromedioEditar.mprHasta, Validators.required),
        mprNemonico: new FormControl(this.modeloPromedioEditar.mprNemonico, Validators.required),
      })
      //AQUI TERMINA ACTUALIZAR
    } else {
      this.formModeloPromedio = this.formBuilder.group({
        graCodigo: new FormControl('', Validators.required),
        mprDenominacion: new FormControl('', Validators.required),
        mprDesde: new FormControl('', Validators.required),
        mprHasta: new FormControl('', Validators.required),
        mprNemonico: new FormControl('', Validators.required),
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
  
  listarCatalogoGrados() {
    this.externoService.listarCatalogoGrados().subscribe(
      (respuesta) => {
        this.listaGrado = respuesta['listado'];
      }
    );
  }

  async listarModeloPromedioAsyn() {
    this.modeloPromedioService.listarModeloPromedioPorRegAniLec(this.reanleCodigo).subscribe(
      (respuesta) => {
        this.listaModeloPromedioChild = respuesta['listado']
        this.listaModeloPromedio.emit(this.listaModeloPromedioChild);
      }
    );
  }

  addRegistro() {
    if (this.formModeloPromedio?.valid) {
      let modeloPromedioTemp = this.formModeloPromedio.value;
      this.modeloPromedio = new TitModeloPromedio({
        mprCodigo: 0,
        mprDenominacion: modeloPromedioTemp.mprDenominacion,
        mprDesde: modeloPromedioTemp.mprDesde,
        mprHasta: modeloPromedioTemp.mprHasta,
        mprNemonico: modeloPromedioTemp.mprNemonico,
        reanleCodigo: this.reanleCodigo,
        tipeduCodigo: this.tipeduCodigo,
        graCodigo: modeloPromedioTemp.graCodigo,
        mprEstado: 1,
      });
    }
    
    if (this.modeloPromedioEditar) {
      this.modeloPromedio['data'].mprCodigo = this.modeloPromedioEditar.mprCodigo;
      this.modeloPromedioService.guardarModeloPromedio(this.modeloPromedio['data']).subscribe({
        next: (response) => {
          this.listarModeloPromedioAsyn();
          this.mensajeService.mensajeCorrecto('Se ha actualizado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeError('Ha habido un problema al actualizar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    } else {
      this.modeloPromedioService.guardarModeloPromedio(this.modeloPromedio['data']).subscribe({
        next: async (response) => {
          this.listarModeloPromedioAsyn();
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

  get mprDenominacionField() {
    return this.formModeloPromedio.get('mprDenominacion');
  }
  get mprDesdeField() {
    return this.formModeloPromedio.get('mprDesde');
  }
  get mprHastaField() {
    return this.formModeloPromedio.get('mprHasta');
  }
  get mprNemonicoField() {
    return this.formModeloPromedio.get('mprNemonico');
  }
}
