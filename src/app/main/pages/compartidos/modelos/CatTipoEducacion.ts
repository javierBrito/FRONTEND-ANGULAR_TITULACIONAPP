
import { get, set } from 'lodash-es';
import { ItipoEducacion } from '../interfaces/ItipoEducacion';
export class CatTipoEducacion implements ItipoEducacion {

    constructor(data) {
        set(this, 'data', data);
    }
    
   

    get tipeduCodigo(): number {
        return get(this, 'data.tipeduCodigo');
    }
    set tipeduCodigo(value: number) {
        set(this, 'data.tipeduCodigo', value);
    }
    get tipeduEstado(): number {
        return get(this, 'data.tipeduEstado');
    }
    set tipeduEstado(value: number) {
        set(this, 'data.tipeduEstado', value);
    }
    get tipeduNombre(): string {
        return get(this, 'data.tipeduNombre');
    }
    set tipeduNombre(value: string) {
        set(this, 'data.tipeduNombre', value);
    }
    get tipeduFechaCreacion(): string {
        return get(this, 'data.tipeduFechaCreacion');
    }
    set tipeduFechaCreacion(value: string) {
        set(this, 'data.tipeduFechaCreacion', value);
    }
    


}
