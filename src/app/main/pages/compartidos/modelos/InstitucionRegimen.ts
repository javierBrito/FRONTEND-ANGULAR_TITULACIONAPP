import { get, set } from 'lodash-es';
import { IinstitucionRegimen } from '../interfaces/IinstitucionRegimen';
export class InstitucionRegimen implements IinstitucionRegimen {
    constructor(data) {
        set(this, 'data', data);
    }

    get insregCodigo(): number {
        return get(this, 'data.insregCodigo');
    }
    get regCodigo(): number {
        return get(this, 'data.regCodigo');
    }
    get insCodigo(): number {
        return get(this, 'data.insCodigo');
    }
    get insregEstado(): number {
        return get(this, 'data.insregEstado');
    }    
}
