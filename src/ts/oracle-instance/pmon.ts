import { Tooltip } from '../utils/tooltip'

export class Pmon{
    private element: HTMLElement

    constructor(){
        this.element = $('#pmon')[0]
        //tooltip do pmon
        new Tooltip("#user-process","Process Monitor", "Olá, eu sou o pmon!")        
    }
}