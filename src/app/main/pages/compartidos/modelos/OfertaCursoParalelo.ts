import { get, set } from 'lodash-es';
import { IofertaCursoParalelo } from '../interfaces/IofertaCursoParalelo';

export class OfertaCursoParalelo implements IofertaCursoParalelo {
    constructor(data) {
        set(this, 'data', data);
    }

    get curCodigo(): number {
        return get(this, 'data.curCodigo');
    }
    set curCodigo(value: number) {
        set(this, 'data.curCodigo', value);
    }
    get parCodigo(): number {
        return get(this, 'data.parCodigo');
    }
    set parCodigo(value: number) {
        set(this, 'data.parCodigo', value);
    }
    get curparCodigo(): number {
        return get(this, 'data.curparCodigo');
    }
    set curparCodigo(value: number) {
        set(this, 'data.curparCodigo', value);
    }

}
