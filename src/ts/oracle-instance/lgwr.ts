import { Delay } from '../time/delay'
import { Tooltip } from '../utils/tooltip'
import { DataBlock } from '../oracle-database/data.block'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { UserProcess } from '../process/user.process'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'

export class Lgwr {
    private element: HTMLElement

    constructor() {
        this.element = $('#lgwr')[0]
        //tooltip do pmon
        new Tooltip("#lgwr", "Log Writer (LGWR)", "Olá, eu sou o LGWR!")
    }

    //counting number of blocks used
    //apagando status dos blocks do redo-log-buffer
    //criando numero de blocks dirty dentro de redo-log-buffer para usar na animacao
    getDirtyBlocksFromRedoLogBuffer(): DataBlock[] {
        let blocks: DataBlock[] = new Array<DataBlock>()
        let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()

        for (let index in redoLogBuffer.getBlocks()) {
            let block = redoLogBuffer.getBlocks()[index]
            if (block.used()) {
                //criando novo bloco que sera usado na animacao de envio para o log writer         
                let newBlock = redoLogBuffer.createNewDataBlock()
                newBlock.setColor(block.getColor())
                blocks.push(newBlock)
                //resetando o estado dos blocos do redo log buffer
                block.setUsed(false)
                block.setColor("#ffffff")
            }
        }

        return blocks
    }

    //implementando animacao pegando do redo.log.buffer e enviando blocks para redo-log-files
    async sendBlocksToRedoLogFiles(blocks: DataBlock[]) {               
        //anima-los para log-writer
        await this.animGetBlocksFromRedoLogBuffer(blocks, 5000)

        //uma vez no log-writer precisamos envia-los ao redo-log-files
        await this.animSendBlocksToRedoLogFiles(blocks, 5000)        
    }

    async animSendBlocksToRedoLogFiles(blocks: DataBlock[], delay: number){
        for (let block of blocks) {
            Orasim.getAnimation().moveTo(block.getElement(), $("#redo-log-file-1")[0], delay, 0, () => {

            }, () => {
                //remova no fim da animacao
                $(block.getElement()).remove()
            })
            delay = delay / 1.5
        }
        await new Delay(delay+1000).sleep()
    }

    async animGetBlocksFromRedoLogBuffer(blocks: DataBlock[], delay: number){
        //movendo blocks para log writer
        for (let block of blocks) {
            Orasim.getAnimation().moveTo(block.getElement(), this.element, delay, 0, () => {

            }, () => {
                //remova no fim da animacao
                //$(block.getElement()).remove()            
            })
            delay = delay / 1.5
        }
        await new Delay(delay+1000).sleep()
    }
}