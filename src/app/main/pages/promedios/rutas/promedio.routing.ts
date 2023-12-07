import { Routes } from "@angular/router";
import { PromedioPrincipalComponent } from "../componentes/promedio-principal/promedio-principal.component";

export const RUTA_PROMEDIO: Routes = [
    {
      path: 'promedios',
      component: PromedioPrincipalComponent,
      //canActivate: [AuthGuard],
    }
  ];