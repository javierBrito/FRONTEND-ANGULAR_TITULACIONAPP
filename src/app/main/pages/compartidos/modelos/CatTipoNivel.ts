
import { get, set } from 'lodash-es';
import { IcatTipoNivel } from '../interfaces/IcatTipoNivel';

export class CatTipoNivel implements IcatTipoNivel {
    constructor(data) {
        set(this, 'data', data);
    }

    get tipnivCodigo(): number {
        return get(this, 'data.tipnivCodigo');
    }
    set tipnivCodigo(value: number) {
        set(this, 'data.tipnivCodigo', value);
    }
    get tipnivEstado(): number {
        return get(this, 'data.tipnivEstado');
    }
    set tipnivEstado(value: number) {
        set(this, 'data.tipnivEstado', value);
    }
    get tipnivDescripcion(): string {
        return get(this, 'data.tipnivDescripcion');
    }
    set tipnivDescripcion(value: string) {
        set(this, 'data.tipnivDescripcion', value);
    }
    get tipnivFechaCreacion(): string {
        return get(this, 'data.tipnivFechaCreacion');
    }
    set tipnivFechaCreacion(value: string) {
        set(this, 'data.tipnivFechaCreacion', value);
    }
}
