import { Hash } from '../crypt/hash'
import { Tooltip } from '../utils/tooltip'
import { DataBlockRedo } from '../oracle-database/data.block.redo'
import { DataBlock } from '../oracle-database/data.block'
import { SharedPool } from '../oracle-instance/shared.pool'
import { Lgwr } from '../oracle-instance/lgwr'

/**
 * Redo Log Buffer
 * Classe responsavel por modelar o objeto RedoLogBuffer do oracle instance
 * @attribute
 * @attribute
 */
export class RedoLogBuffer {
    private element: HTMLElement
    private dataBlockRedoList: DataBlockRedo[]
    private size: number

    constructor() {
        this.size = 6
        this.dataBlockRedoList = new Array<DataBlockRedo>()
        this.element = $("#redo-log-buffer")[0]
        this.setToopTip()
        this.initBlocks()
    }

    initBlocks(): void {
        // let dataBlockRedoListInstance = this.dataBlockRedoList
        // let size = 
        for (let i = 0; i < this.size; i++) {
            this.dataBlockRedoList.push(new DataBlockRedo())
            $("#redo-log-buffer").find('#cache-container').append(this.dataBlockRedoList[i].getElement())
        }
    }

    getBlocks(): DataBlockRedo[] {
        return this.dataBlockRedoList
    }

    createNewDataBlock(): DataBlock {
        let newBlock = new DataBlock()

        //criando block dentro do do elemento atual        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        $(newBlock.getElement()).css("z-index", 100)

        return newBlock
    }

    createNewDataBlockRedo(): DataBlockRedo {
        let newBlock = new DataBlockRedo()

        //criando block dentro do do elemento atual        
        $(this.element).prepend(newBlock.getElement())
        $(newBlock.getElement()).offset($(this.element).offset())
        $(newBlock.getElement()).css("position", "absolute")
        $(newBlock.getElement()).css("z-index", 100)

        return newBlock
    }

    getFirstCleanBlock(): DataBlock{
        for (let block of this.dataBlockRedoList) {
            if (!block.used())
            return block
        }
    }

    setMemoryLocationUsed(hash: Hash): void {
        let sharedPool: SharedPool = Orasim.getOracleInstance().getSga().getSharedPool()
        let lgwr: Lgwr = Orasim.getOracleInstance().getLgwr()
        let memLocationArr = sharedPool.getMemoryLocation(hash)
        
        //limpando ultimos 3 blocks pq na animacao agora so tem 3
        if(memLocationArr.length == 6){
            memLocationArr.pop()
            memLocationArr.pop()
            memLocationArr.pop()            
        }


        //se ja tiver os blocos mapeados retorne
        if(lgwr.hasRedoBufferBlockArr(hash))
            return        
        
        //verificando quais blocks nao estao sendo utilizados e adicionando os mesmos no log writer
        let i = 0
        let blocksUsed = 0        
        let blockIndexArr:number[] = new Array<number>()
        for (let block of this.dataBlockRedoList) {
            if (!block.used() && blocksUsed < memLocationArr.length) {
                block.setUsed(true)
                block.setColor(hash.getColor())
                blockIndexArr.push(i)
                blocksUsed++                
            }
            i++
        }
        lgwr.addRedoBufferBlockArr(hash, blockIndexArr)
    }

    setToopTip(): void {
        // criando tooltip para o RedoLogBuffer
        let tooltip = new Tooltip("#redo-log-buffer", "Redo Log Buffer",
            `
        <p align="justify">

        O Redo Log Buffer é um buffer circular da SGA que contém informações sobre as alterações feitas no banco de dados.
        <br><br>
        As informações de Redo contêm dados necessárias para reconstruir ou refazer, as alterações feitas no banco de dados, como: INSERT, UPDATE, DELETE, CREATE, ALTER ou DROP.
        Estas informações são usadas para recuperação do banco de dados, se necessário.
        <br><br>
        As entradas de redo ocupam espaço contínuo, sequencial no buffer. O processo background <span style='font-weight: bold'>Log Writer (LGWR)</span> grava as informações do Redo Log Buffer para o Redo Log File em disco.
         `
        )
    }
}