import { Tooltip } from '../utils/tooltip'

export class Arcn{
    private element: HTMLElement

    constructor(){
        this.element = $('#arcn')[0]
        //tooltip do pmon
        new Tooltip("#arcn","Archive log (ARCn)", "Olá, eu sou o LGWR!")        
    }
}