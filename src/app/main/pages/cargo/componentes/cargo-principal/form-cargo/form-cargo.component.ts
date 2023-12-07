import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TitCargo } from 'app/main/pages/compartidos/modelos/TitCargo';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import { CargoService } from '../../../servicios/cargo.service';
import { DetailComponent } from '../../detail/detail.component';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.scss']
})

export class FormCargoComponent implements OnInit {
  /*OUTPUT ENVIAN*/
  @Output() close: EventEmitter<boolean>;
  @Output() listaCargo: EventEmitter<any>;
  
  /*INPUT RECIBEN*/
  @Input() listaCargoChild: any;
  @Input() cargoEditar: TitCargo;

  /*MODALES*/
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;
  
  /*VARIABLES*/
  public showDetail: boolean;
  private currentUser: any;

  /*FORMULARIOS*/
  public formCargo: FormGroup;

  /*OBJETOS*/
  public cargo: TitCargo;
  public listacargo: TitCargo[];

  /*CONSTRUCTOR*/
  constructor(
    private cargoService: CargoService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.close = new EventEmitter<boolean>();
    this.listaCargo = new EventEmitter<any>();
    this.showDetail = true;
  }

  ngOnInit() {
    this.listarCargoActivo();
    if (this.cargoEditar) {
      this.formCargo = this.formBuilder.group({
        txtNombre: new FormControl(this.cargoEditar.carNombre, Validators.required),
      })
    } else {
      this.formCargo = this.formBuilder.group({
        txtNombre: new FormControl('', Validators.required),
      })
    }
  }

  async listarCargoActivoAsync() {
    this.cargoService.listarCargoActivo().subscribe(
      (respuesta) => {
        this.listaCargoChild = respuesta['listado']
        for (const ele of this.listaCargoChild) {
          this.cargoService.buscarCargoPorId(ele.carCodigo).subscribe(
            (respuesta) => {
              ele.cargo = respuesta['objeto'];
            }
          )
        }
        this.listaCargo.emit(this.listaCargoChild);
      }
    );
  }

  listarCargoActivo() {
    this.cargoService.listarCargoActivo().subscribe({
      next: (response) => {
        this.listacargo = response['listado'];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  addRegistro() {
    if (this.formCargo?.valid) {
      let cargoTemp = this.formCargo.value;
      this.cargo = new TitCargo({
        carCodigo: cargoTemp.carCodigo,
        carNombre: cargoTemp.txtNombre,
        carEstado: 1,
      });
    }

    if (this.cargoEditar) {
      this.cargo['data'].carCodigo = this.cargoEditar.carCodigo;
      this.cargoService.guardarCargo(this.cargo['data']).subscribe({
        next: (response) => {
          this.listarCargoActivoAsync();
          this.mensajeService.mensajeCorrecto('Se ha actualizado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeCorrecto('Ha habido un problema al actualizar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    } else {
      this.cargoService.guardarCargo(this.cargo['data']).subscribe({
        next: async (response) => {
          this.listarCargoActivoAsync();
          this.mensajeService.mensajeCorrecto('Se ha agregado el registro correctamente...');
          this.parentDetail.closeDetail();
        },
        error: (error) => {
          this.mensajeService.mensajeCorrecto('Ha habido un problema al agregar el registro...');
          this.parentDetail.closeDetail();
        }
      });
    }
  }

  closeDetail($event) {
    this.close.emit($event);
  }

  get nombreField() {
    return this.formCargo.get('txtNombre');
  }
}
