
import { get, set } from 'lodash-es';
import { Imodalidad } from '../interfaces/Imodalidad';
export class CatModalidad implements Imodalidad {

    constructor(data) {
        set(this, 'data', data);
    }
    get modFechaCreacion(): string {
        return get(this, 'data.modFechaCreacion');
    }
    set modFechaCreacion(value: string) {
        set(this, 'data.modFechaCreacion', value);
    }
    get modEstado(): number {
        return get(this, 'data.modEstado');
    }
    set modEstado(value: number) {
        set(this, 'data.modEstado', value);
    }
    get modCodigo(): number {
        return get(this, 'data.modCodigo');
    }
    set modCodigo(value: number) {
        set(this, 'data.modCodigo', value);
    }
    get modNombre(): string {
        return get(this, 'data.modNombre');
    }
    set modNombre(value: string) {
        set(this, 'data.modNombre', value);
    }




}
