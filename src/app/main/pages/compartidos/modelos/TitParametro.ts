import { get, set } from 'lodash-es';
import { Iparametro } from '../interfaces/Iparametro';
export class TitParametro implements Iparametro {
    constructor(data) {
        set(this, 'data', data);
    }
    get parCodigo(): number {
        return get(this, 'data.parCodigo');
    }
    set parCodigo(value: number) {
        set(this, 'data.parCodigo', value);
    }
    get parNombre(): string {
        return get(this, 'data.parNombre');
    }
    set parNombre(value: string) {
        set(this, 'data.parNombre', value);
    }
    get parValor(): string {
        return get(this, 'data.parValor');
    }
    set parValor(value: string) {
        set(this, 'data.parValor', value);
    }
    get parDescripcion(): string {
        return get(this, 'data.parDescripcion');
    }
    set parDescripcion(value: string) {
        set(this, 'data.parDescripcion', value);
    }
    get parEstado(): number {
        return get(this, 'data.parEstado');
    }
    set parEstado(value: number) {
        set(this, 'data.parEstado', value);
    }
    get parFecFin(): string {
        return get(this, 'data.parFecFin');
    }
    set parFecFin(value: string) {
        set(this, 'data.parFecFin', value);
    }
    get parFecInicio(): string {
        return get(this, 'data.parFecInicio');
    }
    set parFecInicio(value: string) {
        set(this, 'data.parFecInicio', value);
    }

}