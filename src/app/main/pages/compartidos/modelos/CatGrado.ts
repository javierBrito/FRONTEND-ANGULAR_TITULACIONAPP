
import { get, set } from 'lodash-es';
import { IcatGrado } from '../interfaces/IcatGrado';

export class CatGrado implements IcatGrado {
    constructor(data) {
        set(this, 'data', data);
    }

    get graCodigo(): number {
        return get(this, 'data.graCodigo');
    }
    set graCodigo(value: number) {
        set(this, 'data.graCodigo', value);
    }
    get nivCodigo(): number {
        return get(this, 'data.nivCodigo');
    }
    set nivCodigo(value: number) {
        set(this, 'data.nivCodigo', value);
    }
    get graEstado(): number {
        return get(this, 'data.graEstado');
    }
    set graEstado(value: number) {
        set(this, 'data.graEstado', value);
    }
    get graDescripcion(): string {
        return get(this, 'data.graDescripcion');
    }
    set graDescripcion(value: string) {
        set(this, 'data.graDescripcion', value);
    }
    get graFechaCreacion(): string {
        return get(this, 'data.graFechaCreacion');
    }
    set graFechaCreacion(value: string) {
        set(this, 'data.graFechaCreacion', value);
    }
    get graNemonico(): string {
        return get(this, 'data.graNemonico');
    }
    set graNemonico(value: string) {
        set(this, 'data.graNemonico', value);
    }

}
