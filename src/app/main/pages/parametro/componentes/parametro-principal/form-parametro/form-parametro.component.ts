import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sede } from 'app/auth/models/sede';
import { TitParametro } from 'app/main/pages/compartidos/modelos/TitParametro';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { ParametroService } from '../../../servicios/parametro.service';
import { DetailComponent } from '../../detail/detail.component';

@Component({
  selector: 'app-form-parametro',
  templateUrl: './form-parametro.component.html',
  styleUrls: ['./form-parametro.component.scss']
})
export class FormParametroComponent implements OnInit {
  /*OUTPUT ENVIAN*/
  @Output() close: EventEmitter<boolean>;
  @Output() listaParametro: EventEmitter<any>;
  
  /*INPUT RECIBEN*/
  @Input() listaParametroChild: any;
  @Input() anioLectivoChild: any;
  @Input() parametroEditar: TitParametro;
  @Input() insCodigo: number;

  /*MODALES*/
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;
  
  /*VARIABLES */
  public showDetail: boolean;
  private currentUser: any;
  private anioLectivo: any;
  
  /*Formularios*/
  public formParametro: FormGroup;

  /*Objetos*/
  public parametro: TitParametro;
  public parametros: TitParametro[];

  constructor(
    private parametroService: ParametroService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.close = new EventEmitter<boolean>();
    this.listaParametro = new EventEmitter<any>();
    this.showDetail = true;
  }

  ngOnInit() {
    this.anioLectivo = this.anioLectivoChild;
    this.listarParametroActivo();
    if (this.parametroEditar) {
      this.formParametro = this.formBuilder.group({
        txtNombre: new FormControl(this.parametroEditar.parNombre, Validators.required),
        txtValor: new FormControl(this.parametroEditar.parValor, Validators.required),
        txtDescripcion: new FormControl(this.parametroEditar.parDescripcion, Validators.required),
        fecInicio: new FormControl(dayjs(this.parametroEditar.parFecInicio).format("YYYY-MM-DD"), Validators.required),
        fecFin: new FormControl(dayjs(this.parametroEditar.parFecFin).format("YYYY-MM-DD"), Validators.required),
      })
    } else {
      this.formParametro = this.formBuilder.group({
        txtNombre: new FormControl('', Validators.required),
        txtValor: new FormControl('', Validators.required),
        txtDescripcion: new FormControl('', Validators.required),
        fecInicio: new FormControl('', Validators.required),
        fecFin: new FormControl('', Validators.required),
      })
    }
  }

  async listarParametroActivoAsync() {
    this.parametroService.listarParametroActivo().subscribe(
      (respuesta) => {
        this.listaParametroChild = respuesta['listado']
        for (const ele of this.listaParametroChild) {
          this.parametroService.buscarParametroPorId(ele.parCodigo).subscribe(
            (respuesta) => {
              ele.parametro = respuesta['objeto'];
            }
          )
        }
        this.listaParametro.emit(this.listaParametroChild);
      }
    );
  }

  listarParametroActivo() {
    this.parametroService.listarParametroActivo().subscribe({
      next: (response) => {
        this.parametros = response['listado'];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  addRegistro() {
    if (this.formParametro?.valid) {
      let parametroTemp = this.formParametro.value;
      this.parametro = new TitParametro({
        parCodigo: parametroTemp.parCodigo,
        parNombre: parametroTemp.txtNombre,
        parValor: parametroTemp.txtValor,
        parDescripcion: parametroTemp.txtDescripcion,
        parEstado: 1,
        parFecInicio: dayjs(parametroTemp.fecInicio).format("YYYY-MM-DD HH:mm:ss.SSS"),
        parFecFin: dayjs(parametroTemp.fecFin).format("YYYY-MM-DD HH:mm:ss.SSS")
      });
    }

    if (this.parametroEditar) {
      this.parametro['data'].parCodigo = this.parametroEditar.parCodigo;
      this.parametroService.guardarParametro(this.parametro['data']).subscribe({
        next: (response) => {
          this.listarParametroActivoAsync();
          //Swal.fire('Se ha actualizado el registro correctamente...', '', 'success');
          this.mensajeService.mensajeCorrecto("Se ha actualizado el registro correctamente...");
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          //Swal.fire('Ha habido un problema al actualizar el registro...', '', 'error');
          this.mensajeService.mensajeError('Ha habido un problema al actualizar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    } else {
      this.parametroService.guardarParametro(this.parametro['data']).subscribe({
        next: async (response) => {
          this.listarParametroActivoAsync();
          //Swal.fire('Se ha agregado el registro correctamente...', '', 'success');
          this.mensajeService.mensajeCorrecto('Se ha agregado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          //Swal.fire('Ha habido un problema al agregar el registro...', '', 'error');
          this.mensajeService.mensajeError('Ha habido un problema al agregar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    }
  }

  closeDetail($event) {
    this.close.emit($event);
  }

  compararParametro(o1, o2) {
    return o1 === undefined || o2 === undefined ? false : o1.parCodigo === o2.parCodigo;
  }

  get nombreField() {
    return this.formParametro.get('txtNombre');
  }
  get descripcionField() {
    return this.formParametro.get('txtDescripcion');
  }
  get valorField() {
    return this.formParametro.get('txtValor');
  }
  get fecInicioField() {
    return this.formParametro.get('fecInicio');
  }
  get fecFinField() {
    return this.formParametro.get('fecFin');
  }  

}
