import { Routes } from '@angular/router';
import { FechaTitulacionPrincipalComponent } from '../componentes/fecha-titulacion-principal/fecha-titulacion-principal.component';

export const RUTA_FECHA_TITULACION: Routes = [
  {
    path: 'fecha-titulacion',
    component: FechaTitulacionPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];