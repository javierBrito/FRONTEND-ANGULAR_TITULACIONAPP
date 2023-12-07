
import { IconsejoEjecutivo } from '../interfaces/IconsejoEjecutivo';
import { get, set } from 'lodash-es';
export class TitConsejoEjecutivo implements IconsejoEjecutivo {
    constructor(data) {
        set(this, 'data', data);
    }
    get carCodigo(): number {
        return get(this, 'data.carCodigo');
    }
    set carCodigo(value: number) {
        set(this, 'data.carCodigo', value);
    }
    get cejCedula(): string {
        return get(this, 'data.cejCedula');
    }
    set cejCedula(value: string) {
        set(this, 'data.cejCedula', value);
    }
    get cejCodigo(): number {
        return get(this, 'data.cejCodigo');
    }
    set cejCodigo(value: number) {
        set(this, 'data.cejCodigo', value);
    }
    get cejEstado(): number {
        return get(this, 'data.cejEstado');
    }
    set cejEstado(value: number) {
        set(this, 'data.cejEstado', value);
    }
    get cejNombre(): string {
        return get(this, 'data.cejNombre');
    }
    set cejNombre(value: string) {
        set(this, 'data.cejNombre', value);
    }
    get reanleCodigo(): number {
        return get(this, 'data.reanleCodigo');
    }
    set reanleCodigo(value: number) {
        set(this, 'data.reanleCodigo', value);
    }
    get insCodigo(): number {
        return get(this, 'data.insCodigo');
    }
    set insCodigo(value: number) {
        set(this, 'data.insCodigo', value);
    }
    get cargo(): any {
        return get(this, 'data.cargo');
    }
    set cargo(value: any) {
        set(this, 'data.cargo', value);
    }


}