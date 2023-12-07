import { Routes } from '@angular/router';
import { ParametroPrincipalComponent } from '../componentes/parametro-principal/parametro-principal.component';

export const RUTA_PARAMETRO: Routes = [
  {
    path: 'parametro',
    component: ParametroPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];