import { get, set } from 'lodash-es';
import { Iregimen } from "../interfaces/Iregimen";

export class CatRegimen implements Iregimen {
    constructor(data) {
        set(this, 'data', data);
    }
    get regFechaCreacion(): string {
        return get(this, 'data.regFechaCreacion');
    }
    set regFechaCreacion(value: string) {
        set(this, 'data.regFechaCreacion', value);
    }
    get regDescripcion(): string {
        return get(this, 'data.regDescripcion');
    }
    set regDescripcion(value: string) {
        set(this, 'data.regDescripcion', value);
    }
    get regCodigo(): number {
        return get(this, 'data.regCodigo');
    }
    set regCodigo(value: number) {
        set(this, 'data.regCodigo', value);
    }
    get regEstado(): number {
        return get(this, 'data.regEstado');
    }
    set regEstado(value: number) {
        set(this, 'data.regEstado', value);
    }
   
}
