import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Sede } from 'app/auth/models/sede';
import { TitCargo } from 'app/main/pages/compartidos/modelos/TitCargo';
import { TitConsejoEjecutivo } from 'app/main/pages/compartidos/modelos/TitConsejoEjecutivo';
import { MensajesIziToastService } from 'app/main/pages/compartidos/servicios/iziToast/mensajesIziToast.service';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import { DetailComponent } from 'app/main/pages/consejo-ejecutivo/componentes/detail/detail.component';
import { MyValidators } from 'app/utils/validators';
import { Observable, Subject } from 'rxjs';
import { ConsejoEjecutivoService } from '../../../servicios/consejo-ejecutivo.service';

@Component({
  selector: 'app-form-consejo-ejecutivo',
  templateUrl: './form-consejo-ejecutivo.component.html',
  styleUrls: ['./form-consejo-ejecutivo.component.scss']
})
export class FormConsejoEjecutivoComponent implements OnInit {
  /*SPINNER*/
  public load_btn: boolean;
  
  /*OUTPUT ENVIAN*/
  @Output() close: EventEmitter<boolean>;
  @Output() listaConsejoEjecutivo: EventEmitter<any>;

  /*INPUT RECIBEN*/
  @Input() listaConsejosEjecutivoChild: any;
  @Input() reanleCodigoChild: any;
  @Input() consejoEjecutivoEditar: TitConsejoEjecutivo;
  @Input() insCodigo: number;

  /*MODALES*/
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;
  
  /*VARIABLES */
  public showDetail: boolean;
  private cargoNull: string;
  private amieRegex: string;
  private currentUser: any;
  private sede: Sede;
  private reanleCodigo: any;
  
  /*FORMULARIOS*/
  public formConsejoEjecutivo: FormGroup;

  /*OBJETOS*/
  public consejoEjecutivo: TitConsejoEjecutivo;
  public cargos: TitCargo[];
  
  /*CONSTRUCTOR*/
  constructor(
    private consejoEjecutivoService: ConsejoEjecutivoService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
    private mensajeIzi: MensajesIziToastService,
  ) {
    this.load_btn = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sede = this.currentUser.sede;
    this.amieRegex = this.patternAmie(this.sede.nombre);
    this.cargoNull = null;
    this.close = new EventEmitter<boolean>();
    this.listaConsejoEjecutivo = new EventEmitter<any>();
    this.showDetail = true;

  }

  ngOnInit() {
    this.reanleCodigo = this.reanleCodigoChild;
    this.listarCargos();
    if (this.consejoEjecutivoEditar) {
      this.formConsejoEjecutivo = this.formBuilder.group({
        txtCedula: new FormControl(this.consejoEjecutivoEditar.cejCedula, Validators.compose([
          MyValidators.isCedulaValid,
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9]*$"),
        ])),
        txtNombreyApell: new FormControl(this.consejoEjecutivoEditar.cejNombre, Validators.required),
        lstcargos: new FormControl(this.consejoEjecutivoEditar.cargo, Validators.required),
      })
      //AQUI TERMINA ACTUALIZAR
    } else {
      this.formConsejoEjecutivo = this.formBuilder.group({
        txtCedula: new FormControl('', Validators.compose([
          MyValidators.isCedulaValid,
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9]*$"),
        ])),
        txtNombreyApell: new FormControl('', Validators.required),
        lstcargos: new FormControl('', Validators.required),
      })
    }
  }
  
  async listarConsejoEjecutivo() {
    this.consejoEjecutivoService.listarConsejoEjecPorInstitucionYAnioLectivo(this.insCodigo, this.reanleCodigo).subscribe(
      (respuesta) => {
        this.listaConsejosEjecutivoChild = respuesta['listado']
        for (const ele of this.listaConsejosEjecutivoChild) {
          this.consejoEjecutivoService.buscarCargoPorId(ele.carCodigo).subscribe(
            (respuesta) => {
              ele.cargo = respuesta['objeto'];
            }
          )
        }
        this.listaConsejoEjecutivo.emit(this.listaConsejosEjecutivoChild);
      }
    );
  }

  patternAmie(amie: string) {
    const valorEncontrar = amie
    const regExp = new RegExp('([0-9])\\w+')
    const amieFiltrado = valorEncontrar.match(regExp)
    return amieFiltrado['0']
  }

  listarCargos() {
    this.consejoEjecutivoService.listarCargos().subscribe({
      next: (response) => {
        this.cargos = response['listado'];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  buscarDatosPorCedula() {
    this.load_btn = true;
    this.buscarPorCedula(this.formConsejoEjecutivo.value.txtCedula).subscribe({
      next: (dato) => {
        this.formConsejoEjecutivo.controls['txtNombreyApell'].setValue(dato[0].nombres);
        this.load_btn = false;
      },
      error: (error) => {
        console.log(error);
        this.load_btn = false;
      }
    });
  }

  buscarPorCedula(cedulaAbuscar: any): Observable<any> {
    let objeto = {
      usuario: "Dinardap",
      cedula: cedulaAbuscar,
      clave: "M1n3DUC2022*",
    };
    var subject = new Subject<any>();
    this.consejoEjecutivoService.buscarPorCedula(objeto).subscribe({
      next: (response) => {
        subject.next(response);
      },
      error: (error) => {
        this.mensajeIzi.mensajeErrorIzi('ERROR: ', 'Existe un error en la busqueda.')
        this.load_btn = false;
      }
    });
    return subject.asObservable();
  }

  addRegistro() {
    if (this.formConsejoEjecutivo?.valid) {
      let consejoEjecutivoTemp = this.formConsejoEjecutivo.value;
      this.consejoEjecutivo = new TitConsejoEjecutivo({
        carCodigo: consejoEjecutivoTemp.lstcargos.carCodigo,
        cejCedula: consejoEjecutivoTemp.txtCedula,
        cejEstado: 1,
        cejNombre: consejoEjecutivoTemp.txtNombreyApell,
        reanleCodigo: this.reanleCodigo,
        insCodigo: this.insCodigo,
      });
    }

    if (this.consejoEjecutivoEditar) {
      this.consejoEjecutivo['data'].cejCodigo = this.consejoEjecutivoEditar.cejCodigo;
      this.consejoEjecutivoService.guardarConsejoEjecutivo(this.consejoEjecutivo['data']).subscribe({
        next: (response) => {
          this.listarConsejoEjecutivo();
          this.mensajeService.mensajeCorrecto('Se ha actualizado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeError('Ha habido un problema al actualizar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    } else {
      this.consejoEjecutivoService.guardarConsejoEjecutivo(this.consejoEjecutivo['data']).subscribe({
        next: async (response) => {
          this.listarConsejoEjecutivo();
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

  compararCargo(o1, o2) {
    return o1 === undefined || o2 === undefined ? false : o1.carCodigo === o2.carCodigo;
  }

  get cedulaField() {
    return this.formConsejoEjecutivo.get('txtCedula');
  }
  get nombreyApellField() {
    return this.formConsejoEjecutivo.get('txtNombreyApell');
  }
}
