import { get, set } from 'lodash-es';
import { IcatNivel } from '../interfaces/IcatNivel';

export class CatNivel implements IcatNivel {
    constructor(data) {
        set(this, 'data', data);
    }

    get nivCodigo(): number {
        return get(this, 'data.nivCodigo');
    }
    set nivCodigo(value: number) {
        set(this, 'data.nivCodigo', value);
    }
    get tipnivCodigo(): number {
        return get(this, 'data.tipnivCodigo');
    }
    set tipnivCodigo(value: number) {
        set(this, 'data.tipnivCodigo', value);
    }
    get nivEstado(): number {
        return get(this, 'data.nivEstado');
    }
    set nivEstado(value: number) {
        set(this, 'data.nivEstado', value);
    }
    get nivDescripcion(): string {
        return get(this, 'data.nivDescripcion');
    }
    set nivDescripcion(value: string) {
        set(this, 'data.nivDescripcion', value);
    }
    get nivFechaCreacion(): string {
        return get(this, 'data.nivFechaCreacion');
    }
    set nivFechaCreacion(value: string) {
        set(this, 'data.nivFechaCreacion', value);
    }
}
