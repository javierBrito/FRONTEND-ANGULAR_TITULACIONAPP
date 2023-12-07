import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.url_seguridades);
    const isApiUrlServicioExterno = request.url.startsWith(environment.url_servicioExterno);
    const isApiUrlCatalogo = request.url.startsWith(environment.url_catalogo)//colocar aqui las url ha interceptar para enviar cabecera
    const isApiUrlTitulacion = request.url.startsWith(environment.url_titulacion)//colocar aqui las url ha interceptar para enviar cabecera
    const isApiUrlOferta = request.url.startsWith(environment.url_oferta)//colocar aqui las url ha interceptar para enviar cabecera
    const isApiUrlGiee = request.url.startsWith(environment.url_giee)//colocar aqui las url ha interceptar para enviar cabecera
    const isApiUrlMatricula = request.url.startsWith(environment.url_matricula)//colocar aqui las url ha interceptar para enviar cabecera
    //console.log(currentUser.token)
    if (isLoggedIn && (isApiUrl || isApiUrlMatricula
      || isApiUrlServicioExterno || isApiUrlCatalogo || isApiUrlTitulacion || isApiUrlOferta || isApiUrlGiee)) {//agregar url a interceptar
      if (this.tokenExpired(currentUser.token)) {
        // token expired
        this._authenticationService.logout();
        this._router.navigate(['/pages/authentication/login-v2']);
      }
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
