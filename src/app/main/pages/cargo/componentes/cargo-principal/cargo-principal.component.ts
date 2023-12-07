import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TitCargo } from 'app/main/pages/compartidos/modelos/TitCargo';
import { MensajeService } from 'app/main/pages/compartidos/servicios/mensaje/mensaje.service';
import Swal from 'sweetalert2';
import { CargoService } from '../../servicios/cargo.service';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-cargo-principal',
  templateUrl: './cargo-principal.component.html',
  styleUrls: ['./cargo-principal.component.scss']
})

export class CargoPrincipalComponent implements OnInit {
  /*MODALES*/
  @ViewChild("modal_confirm_delete", { static: false }) modal_confirm_delete: TemplateRef<any>;
  @ViewChild("modal_success", { static: false }) modal_success: TemplateRef<any>;
  @ViewChild("modal_error", { static: false }) modal_error: TemplateRef<any>;
  @ViewChild(DetailComponent, { static: false }) parentDetail: DetailComponent;
  
  /*VARIABLES*/
  public mensaje: string;
  
  /*LISTAS*/
  public listaCargo: TitCargo[] = [];
  
  /*TABS*/
  public selectedTab: number;
  
  /*DETAIL*/
  public showDetail: boolean;
  
  /*PAGINACION*/
  public page: number;
  public pageVespertina: number;
  public pageNocturna: number;
  public itemsRegistros: number;

  /*OBJETOS*/
  public cargoSeleccionado: TitCargo;
  
  /*CONSTRUCTOR*/
  constructor(
  /*Servicios*/
    private readonly cargoService: CargoService,
    private readonly mensajeService: MensajeService,
  ) {
    this.itemsRegistros = 5;
    this.page = 1;
    this.pageVespertina = 1;
    this.pageNocturna = 1;
    this.showDetail = false;
    this.selectedTab = 0;
  }

  ngOnInit() {
    this.listarCargoActivo();
  }

  listarCargoActivo() {
    this.cargoService.listarCargoActivo().subscribe(
      (respuesta) => {
        this.listaCargo = respuesta['listado'];
        if (this.listaCargo.length < this.itemsRegistros) {
          this.page = 1;
        }
      }
    );
  }

  listarCargoActivoActualizada(event) {
    this.listaCargo = event;
  }

  openDetail() {
    this.showDetail = true;
  }

  openEditarDetail(cargo: TitCargo) {
    this.cargoSeleccionado = cargo;
    if (this.listaCargo.length < this.itemsRegistros) {
      this.page = 1;
    }
    this.showDetail = true;
  }

  openRemoverDetail(cargo: TitCargo) {
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
            this.cargoService.eliminarCargoPorId(cargo.carCodigo).subscribe({
              next: (response) => {
                this.listarCargoActivo();
                this.mensajeService.mensajeCorrecto('El registro ha sido borrada con éxito...');
                this.page = 1;
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
    this.cargoSeleccionado = null;
  }

}
