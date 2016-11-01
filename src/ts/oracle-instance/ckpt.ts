import { Tooltip } from '../utils/tooltip'

export class Ckpt{
    private element: HTMLElement

    constructor(){
        this.element = $('#ckpt')[0]
        //tooltip do pmon
        new Tooltip("#ckpt","Checkpoint Process (CKPT)", "Olá, eu sou o CKPT!")        
    }
}