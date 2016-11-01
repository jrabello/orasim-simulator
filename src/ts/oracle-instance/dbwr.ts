import { Tooltip } from '../utils/tooltip'

export class Dbwr{
    private element: HTMLElement

    constructor(){
        this.element = $('#dbwr')[0]
        //tooltip do pmon
        new Tooltip("#dbwr","Database Writer (DBWn)", "Olá, eu sou o DBWn!")        
    }
}