import { Routes } from '@angular/router';
import { ConsejoEjecutivoPrincipalComponent } from '../componentes/consejo-ejecutivo-principal/consejo-ejecutivo-principal.component';

export const RUTA_CONSEJO_EJECUTIVO: Routes = [
  {
    path: 'consejo-ejecutivo',
    component: ConsejoEjecutivoPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];