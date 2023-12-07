import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromedioService {

  constructor(private http: HttpClient) {
  }
// Guardar promedio 
guardarPromedio(promedio:any): Observable<any[]> {
  return this.http.post<any[]>(`${environment.url_titulacion}/private/guardarPromedio`, promedio);
}
}
