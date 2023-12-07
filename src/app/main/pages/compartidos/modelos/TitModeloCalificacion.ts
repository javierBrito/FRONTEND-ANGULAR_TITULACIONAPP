import { get, set } from 'lodash-es';
import { ImodeloCalificacion } from '../interfaces/ImodeloCalificacion';
export class TitModeloCalificacion implements ImodeloCalificacion {
    constructor(data) {
        set(this, 'data', data);
    }
    get mcaCodigo(): number {
        return get(this, 'data.mcaCodigo');
    }
    set mcaCodigo(value: number) {
        set(this, 'data.mcaCodigo', value);
    }
    get mcaDenominacion(): string {
        return get(this, 'data.mcaDenominacion');
    }
    set mcaDenominacion(value: string) {
        set(this, 'data.mcaDenominacion', value);
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
    get mcaPorcentaje(): number {
        return get(this, 'data.mcaPorcentaje');
    }
    set mcaPorcentaje(value: number) {
        set(this, 'data.mcaPorcentaje', value);
    }    
    get mcaEstado(): number {
        return get(this, 'data.mcaEstado');
    }
    set mcaEstado(value: number) {
        set(this, 'data.mcaEstado', value);
    }
    get codRegAniLec(): number {
        return get(this, 'data.codRegAniLec');
    }
    set codRegAniLec(value: number) {
        set(this, 'data.codRegAniLec', value);
    }
    get tipeduCodigo(): number {
        return get(this, 'data.tipeduCodigo');
    }
    set tipeduCodigo(value: number) {
        set(this, 'data.tipeduCodigo', value);
    }
    get tipoEducacion(): any {
        return get(this, 'data.tipoEducacion');
    }
    set tipoEducacion(value: any) {
        set(this, 'data.tipoEducacion', value);
    }
    get mcaFormula(): string {
        return get(this, 'data.mcaFormula');
    }
    set mcaFormula(value: string) {
        set(this, 'data.mcaFormula', value);
    }
}