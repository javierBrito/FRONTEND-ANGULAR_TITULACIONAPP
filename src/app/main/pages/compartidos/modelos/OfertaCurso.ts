import { get, set } from 'lodash-es';
import { IofertaCurso } from '../interfaces/IofertaCurso';

export class OfertaCurso implements IofertaCurso {
    constructor(data) {
        set(this, 'data', data);
    }

    get reanleCodigo(): number {
        return get(this, 'data.reanleCodigo');
    }
    set reanleCodigo(value: number) {
        set(this, 'data.reanleCodigo', value);
    }
    get jorCodigo(): number {
        return get(this, 'data.jorCodigo');
    }
    set jorCodigo(value: number) {
        set(this, 'data.jorCodigo', value);
    }
    get modCodigo(): number {
        return get(this, 'data.modCodigo');
    }
    set modCodigo(value: number) {
        set(this, 'data.modCodigo', value);
    }
    get espCodigo(): number {
        return get(this, 'data.espCodigo');
    }
    set espCodigo(value: number) {
        set(this, 'data.espCodigo', value);
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
    get curCodigo(): number {
        return get(this, 'data.curCodigo');
    }
    set curCodigo(value: number) {
        set(this, 'data.curCodigo', value);
    }
    get insestCodigo(): number {
        return get(this, 'data.insestCodigo');
    }
    set insestCodigo(value: number) {
        set(this, 'data.insestCodigo', value);
    }
}
