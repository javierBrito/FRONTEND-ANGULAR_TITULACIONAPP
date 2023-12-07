import { get, set } from 'lodash-es';
import { IofeParalelo } from '../interfaces/IofeParalelo';

export class OfeParalelo implements IofeParalelo {
    constructor(data) {
        set(this, 'data', data);
    }
    get parDescripcion(): string {
        return get(this, 'data.parDescripcion');
    }
    set parDescripcion(value: string) {
        set(this, 'data.parDescripcion', value);
    }
    get parFechaCreacion(): string {
        return get(this, 'data.parFechaCreacion');
    }
    set parFechaCreacion(value: string) {
        set(this, 'data.parFechaCreacion', value);
    }
    get parCodigo(): number {
        return get(this, 'data.parCodigo');
    }
    set parCodigo(value: number) {
        set(this, 'data.parCodigo', value);
    }
    get parEstado(): number {
        return get(this, 'data.parEstado');
    }
    set parEstado(value: number) {
        set(this, 'data.parEstado', value);
    }
}
