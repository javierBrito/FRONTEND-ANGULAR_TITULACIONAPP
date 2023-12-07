import { get, set } from 'lodash-es';
import { IcatServicioEducativo } from '../interfaces/IcatServicioEducativo';

export class CatServicioEducativo implements IcatServicioEducativo {
    constructor(data) {
        set(this, 'data', data);
    }
    get sereduCodigo(): number {
        return get(this, 'data.sereduCodigo');
    }
    set sereduCodigo(value: number) {
        set(this, 'data.sereduCodigo', value);
    }
    get sereduDescripcion(): string {
        return get(this, 'data.sereduDescripcion');
    }
    set sereduDescripcion(value: string) {
        set(this, 'data.sereduDescripcion', value);
    }
    get sereduEstado(): number {
        return get(this, 'data.sereduEstado');
    }
    set sereduEstado(value: number) {
        set(this, 'data.sereduEstado', value);
    }
    get motiedCodigo(): number {
        return get(this, 'data.motiedCodigo');
    }
    set motiedCodigo(value: number) {
        set(this, 'data.motiedCodigo', value);
    }
    get proeduCodigo(): number {
        return get(this, 'data.proeduCodigo');
    }
    set proeduCodigo(value: number) {
        set(this, 'data.proeduCodigo', value);
    }
    get reanleCodigo(): number {
        return get(this, 'data.reanleCodigo');
    }
    set reanleCodigo(value: number) {
        set(this, 'data.reanleCodigo', value);
    }
    get sereduNemonico(): string {
        return get(this, 'data.sereduNemonico');
    }
    set sereduNemonico(value: string) {
        set(this, 'data.sereduNemonico', value);
    }
    get tipeduCodigo(): number {
        return get(this, 'data.tipeduCodigo');
    }
    set tipeduCodigo(value: number) {
        set(this, 'data.tipeduCodigo', value);
    }
    get motiedDescripcion(): string {
        return get(this, 'data.motiedDescripcion');
    }
    set motiedDescripcion(value: string) {
        set(this, 'data.motiedDescripcion', value);
    }

}