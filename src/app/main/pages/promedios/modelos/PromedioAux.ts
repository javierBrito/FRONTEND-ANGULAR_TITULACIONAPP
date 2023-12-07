import { IpromedioAux } from "../interfaces/IpromedioAux";
import { get, set } from 'lodash-es';

export class PromedioAux implements IpromedioAux {
    get proCodigo(): number {
        return get(this, 'data.proCodigo');
    }
    set proCodigo(value: number) {
        set(this, 'data.proCodigo', value);
    }
    get mprCodigo(): number {
        return get(this, 'data.mprCodigo');
    }
    set mprCodigo(value: number) {
        set(this, 'data.mprCodigo', value);
    }
    get proValor(): number {
        return get(this, 'data.proValor');
    }
    set proValor(value: number) {
        set(this, 'data.proValor', value);
    }
    get proEstado(): number {
        return get(this, 'data.proEstado');
    }
    set proEstado(value: number) {
        set(this, 'data.proEstado', value);
    }
    get estCodigo(): number {
        return get(this, 'data.estCodigo');
    }
    set estCodigo(value: number) {
        set(this, 'data.estCodigo', value);
    }
    get mprDesde(): number {
        return get(this, 'data.mprDesde');
    }
    set mprDesde(value: number) {
        set(this, 'data.mprDesde', value);
    }
    get mprHasta(): number {
        return get(this, 'data.mprHasta');
    }
    set mprHasta(value: number) {
        set(this, 'data.mprHasta', value);
    }
}