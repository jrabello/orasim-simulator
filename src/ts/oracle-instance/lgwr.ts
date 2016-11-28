import { Tooltip } from '../utils/tooltip'
import { DataBlock } from '../oracle-database/data.block'

export class Lgwr{
    private element: HTMLElement

    constructor(){
        this.element = $('#lgwr')[0]
        //tooltip do pmon
        new Tooltip("#lgwr","Log Writer (LGWR)", "Olá, eu sou o LGWR!")        
    }

    animSendBlocksToRedoLogFiles(blocks: DataBlock[], delay: number): void{
        for(let block of blocks){
            Orasim.getAnimation().moveTo( block.getElement(), $("#redo-log-file-1")[0], delay, 0, () => {
                
            }, () => {
                //remova no fim da animacao
                $(block.getElement()).remove()            
            })
            delay = delay/1.5
        }    
    }

    animGetBlocksFromRedoLogBuffer(blocks: DataBlock[], delay: number): void{
        //movendo blocks para log writer
        for(let block of blocks){
            Orasim.getAnimation().moveTo( block.getElement(), this.element, delay, 0, () => {
                
            }, () => {
                //remova no fim da animacao
                //$(block.getElement()).remove()            
            })
            delay = delay/1.5
        }
    }
}