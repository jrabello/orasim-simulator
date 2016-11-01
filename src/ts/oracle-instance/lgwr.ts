import { Tooltip } from '../utils/tooltip'

export class Lgwr{
    private element: HTMLElement

    constructor(){
        this.element = $('#lgwr')[0]
        //tooltip do pmon
        new Tooltip("#lgwr","Log Writer (LGWR)", "Olá, eu sou o LGWR!")        
    }
}