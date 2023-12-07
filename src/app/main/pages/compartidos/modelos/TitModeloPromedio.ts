import { get, set } from 'lodash-es';
import { ImodeloPromedio } from '../interfaces/ImodeloPromedio';

export class TitModeloPromedio implements ImodeloPromedio {
    constructor(data) {
        set(this, 'data', data);
    }
    get mprCodigo(): number {
        return get(this, 'data.mprCodigo');
    }
    set mprCodigo(value: number) {
        set(this, 'data.mprCodigo', value);
    }
    get reanleCodigo(): number {
        return get(this, 'data.reanleCodigo');
    }
    set reanleCodigo(value: number) {
        set(this, 'data.reanleCodigo', value);
    }
    get tipeduCodigo(): number {
        return get(this, 'data.tipeduCodigo');
    }
    set tipeduCodigo(value: number) {
        set(this, 'data.tipeduCodigo', value);
    }
    get graCodigo(): number {
        return get(this, 'data.graCodigo');
    }
    set graCodigo(value: number) {
        set(this, 'data.graCodigo', value);
    }
    get mprDenominacion(): string {
        return get(this, 'data.mprDenominacion');
    }
    set mprDenominacion(value: string) {
        set(this, 'data.mprDenominacion', value);
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
    get mprEstado(): number {
        return get(this, 'data.mprEstado');
    }
    set mprEstado(value: number) {
        set(this, 'data.mprEstado', value);
    }
    get mprNemonico(): string {
        return get(this, 'data.mprNemonico');
    }
    set mprNemonico(value: string) {
        set(this, 'data.mprNemonico', value);
    }

    get tipoEducacion(): any {
        return get(this, 'data.tipoEducacion');
    }
    set tipoEducacion(value: any) {
        set(this, 'data.tipoEducacion', value);
    }
    get grado(): any {
        return get(this, 'data.grado');
    }
    set grado(value: any) {
        set(this, 'data.grado', value);
    }
}