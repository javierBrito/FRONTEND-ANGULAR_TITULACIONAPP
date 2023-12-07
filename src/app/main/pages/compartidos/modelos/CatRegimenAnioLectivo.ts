import { get, set } from 'lodash-es';
import { IregimenAnioLectivo } from '../interfaces/IregimenAnioLectivo';

export class CatRegimenAnioLectivo implements IregimenAnioLectivo {
    constructor(data) {
        set(this, 'data', data);
    }

    get reanleCodigo(): number {
        return get(this, 'data.reanleCodigo');
    }
    set reanleCodigo(value: number) {
        set(this, 'data.reanleCodigo', value);
    }
    get regCodigo(): number {
        return get(this, 'data.regCodigo');
    }
    set regCodigo(value: number) {
        set(this, 'data.regCodigo', value);
    }
    get jorCodigo(): number {
        return get(this, 'data.jorCodigo');
    }
    set jorCodigo(value: number) {
        set(this, 'data.jorCodigo', value);
    }
    get graCodigo(): number {
        return get(this, 'data.graCodigo');
    }
    set graCodigo(value: number) {
        set(this, 'data.graCodigo', value);
    }       
    get descripcionAnioLectivo(): string {
        return get(this, 'data.descripcionAnioLectivo');
    }
    set descripcionAnioLectivo(value: string) {
        set(this, 'data.descripcionAnioLectivo', value);
    }
    get reanleFechaCreacion(): string {
        return get(this, 'data.reanleFechaCreacion');
    }
    set reanleFechaCreacion(value: string) {
        set(this, 'data.reanleFechaCreacion', value);
    }
    get reanleTipo(): string {
        return get(this, 'data.reanleTipo');
    }
    set reanleTipo(value: string) {
        set(this, 'data.reanleTipo', value);
    }
    get anilecCodigo(): number {
        return get(this, 'data.anilecCodigo');
    }
    set anilecCodigo(value: number) {
        set(this, 'data.anilecCodigo', value);
    }
    get reanleEstado(): number {
        return get(this, 'data.reanleEstado');
    }
    set reanleEstado(value: number) {
        set(this, 'data.reanleEstado', value);
    }    
}
