import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxPaginationModule } from 'ngx-pagination';
import { CorePipesModule } from './../../../@core/pipes/pipes.module';
import { AuthenticationModule } from './authentication/authentication.module';
/*Modulos*/
import { CoreDirectivesModule } from '@core/directives/directives';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PrincipalModule } from './principal/principal.module';
import { ConsejoEjecutivoModule } from './consejo-ejecutivo/modulos/consejo-ejecutivo.module';
import { CargoModule } from './cargo/modulos/cargo.module';
import { FechaTitulacionModule } from './fecha-titulacion/modulos/fecha-titulacion.module';
import { ParametroModule } from './parametro/modulos/parametro.module';
import { ModeloCalificacionModule } from './modelo-calificacion/modulos/modelo-calificacion.module';
import { CalificacionModule } from './calificaciones/modulos/calificacion.module';
import { ModeloPromedioModule } from './modelo-promedio/modulos/modelo-promedio.module';
import { PromedioModule } from './promedios/modulos/promedio.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CorePipesModule,
    CoreDirectivesModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    Ng2FlatpickrModule,
    PrincipalModule,
    NgxPaginationModule,
    ConsejoEjecutivoModule,
    CargoModule,
    FechaTitulacionModule,
    ParametroModule,
    ModeloCalificacionModule,
    CalificacionModule,
    ModeloPromedioModule,
    PromedioModule,  
  ],
  providers: []
})
export class PagesModule { }
