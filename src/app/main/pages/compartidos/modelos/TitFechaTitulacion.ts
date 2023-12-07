import { IfechaTitulacion } from "../interfaces/IfechaTitulacion";
import { get, set } from 'lodash-es';
export class TitFechaTitulacion implements IfechaTitulacion {
    constructor(data) {
        set(this, 'data', data);
    }
    get CatRegimen(): any {
        return get(this, 'data.CatRegimen');
    }
    set CatRegimen(value: any) {
        set(this, 'data.CatRegimen', value);
    }
    get CatAnioLectivo(): any {
        return get(this, 'data.CatAnioLectivo');
    }
    set CatAnioLectivo(value: any) {
        set(this, 'data.CatAnioLectivo', value);
    }

    get ftiCodigo(): number {
        return get(this, 'data.ftiCodigo');
    }
    set ftiCodigo(value: number) {
        set(this, 'data.ftiCodigo', value);
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
    get ftiEstado(): number {
        return get(this, 'data.ftiEstado');
    }
    set ftiEstado(value: number) {
        set(this, 'data.ftiEstado', value);
    }
    get ftiFechaGrado(): string {
        return get(this, 'data.ftiFechaGrado');
    }
    set ftiFechaGrado(value: string) {
        set(this, 'data.ftiFechaGrado', value);
    }
    get ftiFinExonerado(): string {
        return get(this, 'data.ftiFinExonerado');
    }
    set ftiFinExonerado(value: string) {
        set(this, 'data.ftiFinExonerado', value);
    }
    get ftiFinGeneral(): string {
        return get(this, 'data.ftiFinGeneral');
    }
    set ftiFinGeneral(value: string) {
        set(this, 'data.ftiFinGeneral', value);
    }
    get ftiInicioExonerado(): string {
        return get(this, 'data.ftiInicioExonerado');
    }
    set ftiInicioExonerado(value: string) {
        set(this, 'data.ftiInicioExonerado', value);
    }
    get ftiInicioGeneral(): string {
        return get(this, 'data.ftiInicioGeneral');
    }
    set ftiInicioGeneral(value: string) {
        set(this, 'data.ftiInicioGeneral', value);
    }
    get tipoEducacion(): any {
        return get(this, 'data.tipoEducacion');
    }
    set tipoEducacion(value: any) {
        set(this, 'data.tipoEducacion', value);
    }
    get regAniLec(): number {
        return get(this, 'data.regAniLec');
    }
    set regAniLec(value: number) {
        set(this, 'data.regAniLec', value);
    }
}