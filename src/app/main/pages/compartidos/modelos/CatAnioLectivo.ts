import { IanioLectivo } from "../interfaces/IanioLectivo";
import { get, set } from 'lodash-es';

export class CatAnioLectivo implements IanioLectivo {
    constructor(data) {
        set(this, 'data', data);
    }

    get anilecCodigo(): number {
        return get(this, 'data.anilecCodigo');
    }
    set anilecCodigo(value: number) {
        set(this, 'data.anilecCodigo', value);
    }
    get anilecFechaCreacion(): string {
        return get(this, 'data.anilecFechaCreacion');
    }
    set anilecFechaCreacion(value: string) {
        set(this, 'data.anilecFechaCreacion', value);
    }
    get anilecEstado(): number {
        return get(this, 'data.anilecEstado');
    }
    set anilecEstado(value: number) {
        set(this, 'data.anilecEstado', value);
    }
    get tipideFechaCreacion(): string {
        return get(this, 'data.tipideFechaCreacion');
    }
    set tipideFechaCreacion(value: string) {
        set(this, 'data.tipideFechaCreacion', value);
    }
    get anilecAnioInicio(): number {
        return get(this, 'data.anilecAnioInicio');
    }
    set anilecAnioInicio(value: number) {
        set(this, 'data.anilecAnioInicio', value);
    }
    get anilecAnioFin(): number {
        return get(this, 'data.anilecAnioFin');
    }
    set anilecAnioFin(value: number) {
        set(this, 'data.anilecAnioFin', value);
    }
}
