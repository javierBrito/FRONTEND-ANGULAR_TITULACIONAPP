import { Routes } from '@angular/router';
import { CargoPrincipalComponent } from '../componentes/cargo-principal/cargo-principal.component';

export const RUTA_CARGO: Routes = [
  {
    path: 'cargo',
    component: CargoPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];