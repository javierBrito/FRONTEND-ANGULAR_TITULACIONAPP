import { IcalificacionAux } from "../interfaces/IcalificacionAux";
import { get, set } from 'lodash-es';

export class CalificacionAux implements IcalificacionAux {
    get calCodigo(): number {
        return get(this, 'data.calCodigo');
    }
    set calCodigo(value: number) {
        set(this, 'data.calCodigo', value);
    }
    get mcaCodigo(): number {
        return get(this, 'data.mcaCodigo');
    }
    set mcaCodigo(value: number) {
        set(this, 'data.mcaCodigo', value);
    }
    get calValor(): number {
        return get(this, 'data.calValor');
    }
    set calValor(value: number) {
        set(this, 'data.calValor', value);
    }
    get calEstado(): number {
        return get(this, 'data.calEstado');
    }
    set calEstado(value: number) {
        set(this, 'data.calEstado', value);
    }
    get estCodigo(): number {
        return get(this, 'data.estCodigo');
    }
    set estCodigo(value: number) {
        set(this, 'data.estCodigo', value);
    }
    get mcaDesde(): number {
        return get(this, 'data.mcaDesde');
    }
    set mcaDesde(value: number) {
        set(this, 'data.mcaDesde', value);
    }
    get mcaHasta(): number {
        return get(this, 'data.mcaHasta');
    }
    set mcaHasta(value: number) {
        set(this, 'data.mcaHasta', value);
    }
    get mcaFormula(): string {
        return get(this, 'data.mcaFormula');
    }
    set mcaFormula(value: string) {
        set(this, 'data.mcaFormula', value);
    }
    get proValor(): number {
        return get(this, 'data.proValor');
    }
    set proValor(value: number) {
        set(this, 'data.proValor', value);
    }
}