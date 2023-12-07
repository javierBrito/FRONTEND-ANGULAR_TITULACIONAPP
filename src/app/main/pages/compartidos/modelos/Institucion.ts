import { Iinstitucion } from '../interfaces/Iinstitucion';
import { get, set } from 'lodash-es';
export class Institucion implements Iinstitucion {
    constructor(data) {
        set(this, 'data', data);
    }
    get codInstitucionEducativa(): number {
        return get(this, 'data.codInstitucionEducativa');
    }
    get codAmie(): string {
        return get(this, 'data.codAmie');
    }
    get nomInstitucionEducativa(): string {
        return get(this, 'data.nomInstitucionEducativa');
    }
    get nomEstadoIe(): string {
        return get(this, 'data.nomEstadoIe');
    }
    get nomSostenimiento(): string {
        return get(this, 'data.nomSostenimiento');
    }
    get descripcionRegimen(): string {
        return get(this, 'data.descripcionRegimen');
    }
    get descripcionJurisdiccion(): string {
        return get(this, 'data.descripcionJurisdiccion');
    }
    get nomZona(): string {
        return get(this, 'data.nomZona');
    }
    get nomDistrito(): string {
        return get(this, 'data.nomDistrito');
    }
    get codAdDistrito(): string {
        return get(this, 'data.codAdDistrito');
    }
    get nomCircuito(): string {
        return get(this, 'data.nomCircuito');
    }
    get codAdCircuito(): string {
        return get(this, 'data.codAdCircuito');
    }
    get nomProvincia(): string {
        return get(this, 'data.nomProvincia');
    }
    get nomCanton(): string {
        return get(this, 'data.nomCanton');
    }
    get codDpaParroquia(): string {
        return get(this, 'data.codDpaParroquia');
    }
    get nomParroquia(): string {
        return get(this, 'data.nomParroquia');
    }
}
