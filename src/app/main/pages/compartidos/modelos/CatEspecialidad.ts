import { get, set } from 'lodash-es';
import { Iespecialidad } from '../interfaces/Iespecialidad';

export class CatEspecialidad implements Iespecialidad {
    constructor(data) {
        set(this, 'data', data);
    }

    get espCodigo(): number {
        return get(this, 'data.espCodigo');
    }
    set espCodigo(value: number) {
        set(this, 'data.espCodigo', value);
    }
    get nivCodigo(): number {
        return get(this, 'data.nivCodigo');
    }
    set nivCodigo(value: number) {
        set(this, 'data.nivCodigo', value);
    }
    get figproCodigo(): number {
        return get(this, 'data.figproCodigo');
    }
    set figproCodigo(value: number) {
        set(this, 'data.figproCodigo', value);
    }
    get espEstado(): number {
        return get(this, 'data.espEstado');
    }
    set espEstado(value: number) {
        set(this, 'data.espEstado', value);
    }
    get espDescripcion(): string {
        return get(this, 'data.espDescripcion');
    }
    set espDescripcion(value: string) {
        set(this, 'data.espDescripcion', value);
    }
    get espVigente(): string {
        return get(this, 'data.espVigente');
    }
    set espVigente(value: string) {
        set(this, 'data.espVigente', value);
    }

    get espFechaCreacion(): string {
        return get(this, 'data.espFechaCreacion');
    }
    set espFechaCreacion(value: string) {
        set(this, 'data.espFechaCreacion', value);
    }





}
