import { Tooltip } from '../utils/tooltip'

export class Smon{
    private element: HTMLElement

    constructor(){
        this.element = $('#smon')[0]
        //tooltip do pmon
        new Tooltip("#smon","System Monitor (SMON)", "Olá, eu sou o SMON!")        
    }
}