import { Icalificacion } from "../interfaces/Icalificacion";
import { get, set } from 'lodash-es';

export class Calificacion implements Icalificacion {
    get calCodigo(): number {
        return get(this, 'data.proCodigo');
    }
    set calCodigo(value: number) {
        set(this, 'data.proCodigo', value);
    }
    get mcaCodigo(): number {
        return get(this, 'data.mprCodigo');
    }
    set mcaCodigo(value: number) {
        set(this, 'data.mprCodigo', value);
    }
    get calValor(): number {
        return get(this, 'data.proValor');
    }
    set calValor(value: number) {
        set(this, 'data.proValor', value);
    }
    get calEstado(): number {
        return get(this, 'data.calEstado');
    }
    set calEstado(value: number) {
        set(this, 'data.calEstado', value);
    }
    get estCodigo(): number {
        return get(this, 'data.estCodigo');
    }
    set estCodigo(value: number) {
        set(this, 'data.estCodigo', value);
    }
}