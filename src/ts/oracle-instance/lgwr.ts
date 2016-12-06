import { Hash } from '../crypt/hash'
import { Delay } from '../time/delay'
import { Tooltip } from '../utils/tooltip'
import { DataBlock } from '../oracle-database/data.block'
import { DbBufferCache } from '../oracle-instance/db.buffer.cache'
import { DataBlockRedo } from '../oracle-database/data.block.redo'
import { RedoLogBuffer } from '../oracle-instance/redo.log.buffer'
import { UserProcess } from '../process/user.process'
import { SqlConsoleMsgInfo } from '../sql-console/sql.console.msg.info'
 

export class Lgwr {
    private element: HTMLElement
    //mapa para redo buffer cache
    private redoBufferBlocksMap: std.HashMap<number, number[]>
    //mapa para redo data files
    private redoDataFilesMap: std.HashMap<number, number[]>

    constructor() {
        //tooltip do pmon
        this.element = $('#lgwr')[0]        
        new Tooltip("#lgwr", "Log Writer (LGWR)", "Olá, eu sou o LGWR!")
        this.redoBufferBlocksMap = new std.HashMap<number, number[]>()
        this.redoDataFilesMap = new std.HashMap<number, number[]>()
        //this.redoBufferBlocks.has(123)
    }

    hasRedoBufferBlockArr(hash: Hash): boolean{
        return this.redoBufferBlocksMap.has(hash.getHash())
    }

    addRedoBufferBlockArr(hash: Hash, indexBlocksArr: number[]): void{
        this.redoBufferBlocksMap.insert(std.make_pair(hash.getHash(), indexBlocksArr))
    }

    //counting number of blocks used
    //apagando status dos blocks do redo-log-buffer
    //criando numero de blocks dirty dentro de redo-log-buffer para usar na animacao
    getDirtyBlocksFromRedoLogBuffer(): DataBlockRedo[] {
        let blocks: DataBlockRedo[] = new Array<DataBlockRedo>()
        let redoLogBuffer: RedoLogBuffer = Orasim.getOracleInstance().getSga().getRedoLogBuffer()

        for (let index in redoLogBuffer.getBlocks()) {
            let block = redoLogBuffer.getBlocks()[index]
            if (block.used()) {                
                //criando novo bloco que sera usado na animacao de envio para o log writer         
                let newBlock = redoLogBuffer.createNewDataBlockRedo()
                newBlock.setColor(block.getColor())
                blocks.push(newBlock)
                //resetando o estado dos blocos do redo log buffer
                block.setUsed(false)
                block.setColor("#ffffff")
                //removendo DataBlockRedo indexes usadas do map                
                let hashForDelete: std.HashSet<number> = new std.HashSet<number>() 
                for (let it = this.redoBufferBlocksMap.begin(); !it.equals(this.redoBufferBlocksMap.end()); it = it.next()) {
                    for (let index2 of it.second){
                        if(index2.toString() == index){
                            hashForDelete.insert(it.first)
                            continue
                        }
                    }
                }
                for (let it = hashForDelete.begin(); !it.equals(hashForDelete.end()); it = it.next()) {
                    this.redoBufferBlocksMap.erase(it.value)
                }                    
            }
        }

        return blocks
    }

    //implementando animacao pegando do redo.log.buffer e enviando blocks para redo-log-files
    async sendBlocksToRedoLogFiles(blocks: DataBlock[]) {               
        //anima-los para log-writer
        await this.animGetBlocksFromRedoLogBuffer(blocks, 5000)

        Orasim.getSqlConsole().addMsg(new SqlConsoleMsgInfo('< LGWR > Gravando as entradas no Redo Log File'))        
        await new Delay(3000).sleep()
        
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
        await new Delay(delay).sleep()
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
        await new Delay(delay).sleep()
    }
}