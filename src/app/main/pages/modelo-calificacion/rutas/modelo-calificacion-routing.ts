import { Routes } from '@angular/router';
import { ModeloCalificacionPrincipalComponent } from '../componentes/modelo-calificacion-principal/modelo-calificacion-principal.component';

export const RUTA_MODELO_CALIFICACION: Routes = [
  {
    path: 'modelo-calificacion',
    component: ModeloCalificacionPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];