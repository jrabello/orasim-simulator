import { Tooltip } from '../utils/tooltip'
import { DbBufferCache } from './db.buffer.cache'
import { SharedPool } from './shared.pool' 
import { RedoLogBuffer } from './redo.log.buffer'

export class Sga{
    private dbBufferCache: DbBufferCache
    private sharedPool: SharedPool
    private redoLogBuffer: RedoLogBuffer

    constructor(){
        this.dbBufferCache = new DbBufferCache()
        this.sharedPool = new SharedPool()
        this.redoLogBuffer = new RedoLogBuffer()

/*
 * Arrumar sobreposição do click da SGA e seus componentes.
 * 
 * 
        // criando tooltip para a SGA
        let tooltip = new Tooltip("#sga", "System Global Area (SGA)", 
        `
        <p align="justify">

        A SGA é um grupo de estruturas de memória compartilhada, que contêm dados e informações de controle para uma única instância do banco de dados Oracle.
        <br>
        A SGA é compartilhada por todos os User Process e Background Process.

         `
        )
*/
    }

    getSharedPool(){
        return this.sharedPool
    }

    getDbBufferCache(){
        return this.dbBufferCache
    }

    getRedoLogBuffer(){
        return this.redoLogBuffer
    }
}