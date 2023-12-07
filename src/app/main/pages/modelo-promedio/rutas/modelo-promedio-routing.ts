import { Routes } from '@angular/router';
import { ModeloPromedioPrincipalComponent } from '../componentes/modelo-promedio-principal/modelo-promedio-principal.component';

export const RUTA_MODELO_PROMEDIO: Routes = [
  {
    path: 'modelo-promedio',
    component: ModeloPromedioPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];