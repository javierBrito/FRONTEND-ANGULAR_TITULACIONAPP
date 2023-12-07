import { Routes } from "@angular/router";
import { CalificacionPrincipalComponent } from "../componentes/calificacion-principal/calificacion-principal.component";

export const RUTA_CALIFICACION: Routes = [
  {
    path: 'calificaciones',
    component: CalificacionPrincipalComponent,
    //canActivate: [AuthGuard],
  }
];