import { Tooltip } from '../utils/tooltip'

export class Pmon{
    private element: HTMLElement

    constructor(){
        this.element = $('#pmon')[0]
        //tooltip do pmon
        new Tooltip("#pmon","Process Monitor (PMON)", "Olá, eu sou o PMON!")        
    }
}