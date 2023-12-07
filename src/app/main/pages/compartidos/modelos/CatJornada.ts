import { get, set } from 'lodash-es';
import { Ijornada } from '../interfaces/Ijornada';

export class CatJornada implements Ijornada {
    constructor(data) {
        set(this, 'data', data);
    }
    
    get jorCodigo(): number {
        return get(this, 'data.jorCodigo');
    }
    set jorCodigo(value: number) {
        set(this, 'data.jorCodigo', value);
    }
    get jorEstado(): number {
        return get(this, 'data.jorEstado');
    }
    set jorEstado(value: number) {
        set(this, 'data.jorEstado', value);
    }
    get jorNombre(): string {
        return get(this, 'data.jorNombre');
    }
    set jorNombre(value: string) {
        set(this, 'data.jorNombre', value);
    }
    get jorFechaCreacion(): string {
        return get(this, 'data.jorFechaCreacion');
    }
    set jorFechaCreacion(value: string) {
        set(this, 'data.jorFechaCreacion', value);
    }
    
   
}
