
import { get, set } from 'lodash-es';
import { Icargo } from '../interfaces/Icargo';
export class TitCargo implements Icargo {

    constructor(data) {
        set(this, 'data', data);
    }


    get carCodigo(): number {
        return get(this, 'data.carCodigo');
    }
    set carCodigo(value: number) {
        set(this, 'data.carCodigo', value);
    }
    get carNombre(): string {
        return get(this, 'data.carNombre');
    }
    set carNombre(value: string) {
        set(this, 'data.carNombre', value);
    }

    get carEstado(): number {
        return get(this, 'data.carEstado');
    }
    set carEstado(value: number) {
        set(this, 'data.carEstado', value);
    }





}
